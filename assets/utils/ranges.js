module.exports = {
  sexRange: [
    { key: 1, value: '男' },
    { key: 2, value: '女' },
  ],
  educationRange: [
    { key: 1, value: '小学' },
    { key: 2, value: '初中' },
    { key: 3, value: '高中' },
    { key: 4, value: '本科' },
    { key: 5, value: '研究生' },
    { key: 6, value: '博士' },
    { key: 7, value: '博士后' },
    { key: 8, value: '其他' }
  ],
  marriageRange: [
    {key: 1, value: '已婚'},
    {key: 2, value: '未婚'},
    {key: 3, value: '离异'},
    {key: 4, value: '丧偶'},
    {key: 5, value: '保密'},
  ],
  ageRange: [
    { key: 0, value: '18-23' },
    { key: 1, value: '23-28' },
    { key: 2, value: '28-33' },
    { key: 3, value: '33-38' },
    { key: 4, value: '38+' },
  ],
  heightRange: [
    { key: 0, value: '160-165' },
    { key: 1, value: '165-170' },
    { key: 2, value: '170-175' },
    { key: 3, value: '175-180' },
    { key: 4, value: '180-185' },
    { key: 5, value: '185-190' },
  ],
  getPickerKey(name, index) {
    return this[`${name}Range`][index] && this[`${name}Range`][index].key
  },
  getPickerValueByKey(name, key) {
    let value = ''
    this[`${name}Range`].forEach((item, index) => {
      if(item.key === key) {
        value = index
      }
    })

    return value
  },
  getPickerValueByValue(name, v) {
    let value = ''
    this[`${name}Range`].forEach((item, index) => {
      if (item.value === v) {
        value = index
      }
    })

    return value
  }
}