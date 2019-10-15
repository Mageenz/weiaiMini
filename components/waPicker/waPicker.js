// components/listItem/listItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: {
      type: String,
      value: ''
    },
    labelIcon: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    },
    showArrow: {
      type: Boolean,
      value: true
    },
    last: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ''
    },
    range: {
      type: Array,
      value: []
    },
    rangeKey: {
      type: String,
      value: 'value'
    },
    mode: {
      type: String,
      value: 'selector'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(e) {
      this.triggerEvent('change', e.detail.value)
    }
  }
})
