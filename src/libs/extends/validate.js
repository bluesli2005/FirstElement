/**
 * Created by Capricorncd.
 * Date: 2020-09-24 11:50
 */
export function formSyncValidator(rules, form) {
  const errors = {}
  let count = 0

  let ruleValue, tempValue, tempMessage, tempLength

  Object.keys(rules).forEach((key) => {
    // key毎にセットする、
    // 同じキー複数エラーの場合、最初のエラーのみを返却する
    tempMessage = null

    tempValue = form[key]
    tempLength = typeof tempValue === 'string' ? tempValue.trim().length : 0
    ruleValue = rules[key]

    if (!Array.isArray(ruleValue)) {
      ruleValue = [{ max: ruleValue }]
    }

    ruleValue.forEach((item) => {
      // required
      if (item.required === true && tempLength === 0) {
        tempMessage = item.message || 'この値は必須項目です'
      }
      // custom validator
      if (typeof item.validator === 'function') {
        tempMessage = item.validator(form[key], rules, form)
      } else if (item.min > 0 && tempLength < item.min) {
        tempMessage = item.message || `${item.min}文字以上`
      } else if (item.max > 0 && tempLength > item.max) {
        tempMessage = item.message || `最大${item.max}文字`
      }
      // set error message
      if (tempMessage) {
        errors[key] = tempMessage
        count++
      }
    })
  })
  errors.length = count
  return errors
}
