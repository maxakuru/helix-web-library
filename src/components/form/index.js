/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { toClassName } from '../../decorators.js';

/* eslint-disable no-param-reassign */

function isRequired(fd) {
  return typeof fd.Required === 'string' && ['x', 'yes', 'true'].includes(fd.Required.toLowerCase());
}

function camelCase(str) {
  if (!str || typeof str !== 'string') return str;
  return str.split(' ').filter((s) => !!s).map((s, i) => {
    const f = s.toLowerCase();
    if (i === 0) return f;
    return f.substring(0, 1).toUpperCase() + f.substring(1);
  }).join('');
}

function createSelect(fd, swap) {
  const select = document.createElement('select');
  select.id = fd.Field;
  if (fd.Placeholder) {
    const ph = document.createElement('option');
    ph.textContent = swap[camelCase(fd.Placeholder)] || fd.Placeholder;
    ph.setAttribute('selected', '');
    ph.setAttribute('disabled', '');
    select.append(ph);
  }
  fd.Options.split(',').forEach((o) => {
    const option = document.createElement('option');
    o = o.trim();
    option.textContent = swap[camelCase(o)] || o;
    option.value = o;
    select.append(option);
  });
  if (isRequired(fd)) {
    select.setAttribute('required', 'required');
  }
  if (fd.Autocomplete) {
    select.setAttribute('autocomplete', fd.Autocomplete);
  }
  return select;
}

function constructPayload(form) {
  const payload = {};
  [...form.elements].forEach((fe) => {
    if (fe.type === 'checkbox') {
      if (fe.checked) payload[fe.id] = fe.value;
    } else if (fe.id) {
      payload[fe.id] = fe.value;
    }
  });
  return payload;
}

async function submitForm(form, payload) {
  const resp = await fetch(form.dataset.action, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: payload }),
  });
  await resp.text();
  return payload;
}

function createButton(fd, swap, action) {
  const button = document.createElement('button');
  button.textContent = swap[camelCase(fd.Label)] || fd.Label;
  button.classList.add('button');
  if (fd.Variant) {
    button.classList.add(toClassName(fd.Variant));
  }
  if (fd.Type !== 'submit' && !action && !fd.Event) {
    return button;
  }
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    const form = button.closest('form');
    if (fd.Event) {
      form.dispatchEvent(new CustomEvent('form-event', { detail: { type: fd.Event } }));
    }
    if (fd.Type !== 'submit') {
      return;
    }

    if (!form.checkValidity()) {
      return;
    }
    const payload = constructPayload(form);

    if (action && typeof action === 'function') {
      button.setAttribute('disabled', '');
      await action.call(null, payload);
    } else {
      button.setAttribute('disabled', '');
      await submitForm(form, payload);
    }

    // redirect
    if (fd.Extra) {
      window.location.href = fd.Extra;
    }
  });
  return button;
}

function createHeading(fd, swap) {
  const heading = document.createElement('h3');
  heading.textContent = swap[camelCase(fd.Label)] || fd.Label;
  return heading;
}

function createInput(fd, swap) {
  const input = document.createElement('input');
  input.type = fd.Type;
  input.id = fd.Field;
  input.setAttribute('placeholder', swap[camelCase(fd.Placeholder)] || fd.Placeholder);
  if (isRequired(fd)) {
    input.setAttribute('required', 'required');
  }
  if (fd.Autocomplete) {
    input.setAttribute('autocomplete', fd.Autocomplete);
  }
  return input;
}

function createTextArea(fd, swap) {
  const input = document.createElement('textarea');
  input.id = fd.Field;
  input.setAttribute('placeholder', swap[camelCase(fd.Placeholder)] || fd.Placeholder);
  if (isRequired(fd)) {
    input.setAttribute('required', 'required');
  }
  if (fd.Autocomplete) {
    input.setAttribute('autocomplete', fd.Autocomplete);
  }
  return input;
}

function createLabel(fd, swap) {
  const label = document.createElement('label');
  label.setAttribute('for', fd.Field);
  label.textContent = swap[camelCase(fd.Label)] || fd.Label;
  if (isRequired(fd)) {
    label.classList.add('required');
  }
  return label;
}

function applyRules(form, rules) {
  const payload = constructPayload(form);
  rules.forEach((field) => {
    const { type, condition: { key, operator, value } } = field.rule;
    if (type === 'visible') {
      if (operator === 'eq') {
        if (payload[key] === value) {
          form.querySelector(`.${field.fieldId}`).classList.remove('hidden');
        } else {
          form.querySelector(`.${field.fieldId}`).classList.add('hidden');
        }
      }
    }
  });
}

/**
 * Generates a form from a form definition in a sheet.
 * @param {string} formURL The url to the form definition
 * @param {any} options Options object
 * @preserve Exclude from terser
 */
export async function createForm(formURL, opts = {}) {
  const url = opts.absoluteDefinitionURL ? formURL : new URL(formURL).pathname;

  let { submissionURL, action } = opts;
  if (!submissionURL) {
    [submissionURL] = url.split('.json');
  }

  const resp = await fetch(url);
  const json = await resp.json();
  const form = document.createElement('form');
  const rules = [];
  if (!action && action !== null) {
    // eslint-disable-next-line prefer-destructuring
    form.dataset.action = submissionURL;
  } else if (typeof action === 'string') {
    form.dataset.action = action;
    action = undefined;
  }

  if (opts.autocomplete) {
    form.setAttribute('autocomplete', opts.autocomplete);
  }

  const swap = opts.placeholders || {};

  json.data.forEach((fd) => {
    fd.Type = fd.Type || 'text';
    const fieldWrapper = document.createElement('div');
    const style = fd.Style ? ` form-${fd.Style}` : '';
    const fieldId = `form-${fd.Field}-wrapper${style}`;
    fieldWrapper.className = fieldId;
    fieldWrapper.classList.add('field-wrapper');
    switch (fd.Type) {
      case 'select':
        fieldWrapper.append(createLabel(fd, swap));
        fieldWrapper.append(createSelect(fd, swap));
        break;
      case 'heading':
        fieldWrapper.append(createHeading(fd, swap));
        break;
      case 'checkbox':
        fieldWrapper.append(createInput(fd, swap));
        fieldWrapper.append(createLabel(fd, swap));
        break;
      case 'text-area':
        fieldWrapper.append(createLabel(fd, swap));
        fieldWrapper.append(createTextArea(fd, swap));
        break;
      case 'submit':
        fieldWrapper.append(createButton(fd, swap, action));
        break;
      case 'button':
        fieldWrapper.append(createButton(fd, swap));
        break;
      default:
        fieldWrapper.append(createLabel(fd, swap));
        fieldWrapper.append(createInput(fd, swap));
    }

    if (fd.Rules) {
      try {
        rules.push({ fieldId, rule: JSON.parse(fd.Rules) });
      } catch (e) {
        console.log(`Invalid Rule ${fd.Rules}: ${e}`);
      }
    }
    form.append(fieldWrapper);
  });

  form.addEventListener('change', () => applyRules(form, rules));
  applyRules(form, rules);

  return form;
}
