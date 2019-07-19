// components/waButton/waButton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    disabled: {
      type: Boolean,
      value: false
    },
    onClick: {
      type: Function,
      value: () => {}
    },
    type: {
      type: String,
      value: 'primary'
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
    handleClick() {
      if(!this.properties.disabled) {
        this.properties.onClick()
      }
    }
  }
})
