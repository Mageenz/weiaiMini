// components/waInput/waInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    label: String,
    disabled: Boolean,
    placeholder: String,
    type: {
      type: String,
      value: 'text'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInput(e) {
      this.triggerEvent('input', e.detail.value)
    }
  }
})
