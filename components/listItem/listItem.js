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
    content: {
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
    handleTap() {
      this.triggerEvent('click')
    }
  }
})
