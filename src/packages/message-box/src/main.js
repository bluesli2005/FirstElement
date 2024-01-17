/**
 * Created by Capricorncd.
 * Date: 2020-08-18 11:13
 */
import Vue from 'vue'
import merge from 'deepmerge'
import MessageBoxComponent from './index'

const DEFAULT_OPTIONS = {
  buttons: {
    ok: {
      text: 'OK',
      type: 'primary',
    },
    cancel: {
      text: 'キャンセル',
      type: 'primary',
    },
  },
  maskColor: '',
  maskOpacity: '',
  boxShadow: '',
  type: 'warning',
}

let instance

function initInstance() {
  const MessageBoxConstructor = Vue.extend(MessageBoxComponent)
  instance = new MessageBoxConstructor({
    el: document.createElement('div'),
  })
}

function showMessage(resolve, reject, dialogType, msg, options = {}) {
  const _options = merge(DEFAULT_OPTIONS, options)
  if (!instance) {
    initInstance()
  }
  instance.message = msg
  instance.dialogType = dialogType
  try {
    const { ok, cancel } = _options.buttons
    if (ok) {
      instance.okBtnText = ok.text
      instance.okBtnType = ok.type
    }
    if (cancel) {
      instance.cancelBtnText = cancel.text
      instance.cancelBtnType = cancel.type
    }
    Object.keys(DEFAULT_OPTIONS).forEach((key) => {
      if (['buttons'].includes(key)) return
      if (_options[key]) {
        instance[key] = _options[key]
      }
    })
  } catch (e) {
    console.error(e)
  }

  instance.callback = function (btnType) {
    switch (btnType) {
      case 'ok':
        resolve()
        break
      case 'cancel':
        reject()
        break
    }
    instance.visible = false
  }

  document.querySelector('body').appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.visible = true
  })
}

const MessageBox = function () {}

MessageBox.alert = function (msg, options) {
  return new Promise((resolve, reject) => {
    showMessage(resolve, reject, 'alert', msg, options)
  })
}

MessageBox.confirm = function (msg, options) {
  return new Promise((resolve, reject) => {
    showMessage(resolve, reject, 'confirm', msg, options)
  })
}

MessageBox.success = function (msg, options) {
  return new Promise((resolve, reject) => {
    showMessage(resolve, reject, 'success', msg, options)
  })
}
MessageBox.error = function (msg, options) {
  return new Promise((resolve, reject) => {
    showMessage(resolve, reject, 'error', msg, options)
  })
}

export { MessageBox }

export default MessageBox
