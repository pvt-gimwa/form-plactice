const test = (rule: string, value: string, callback:any ) => {
  const patter = new RegExp('^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$')
  if (!patter.test(value)) {
    return callback(new Error('请输入正确格式的手机号！'))
  } else {
    callback() // 必须有此项回调，否则验证会一直不通过
  }
}
// 手机号码验证
const validatePhone = (rule: string, value: string, callback:any ) => {
    const patter = new RegExp('^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$')
    if (!patter.test(value)) {
      return callback(new Error('请输入正确格式的手机号！'))
    } else {
      callback() // 必须有此项回调，否则验证会一直不通过
    }
  }
  // 邮箱的正则
  const validateEmail = (rule: string, value: string, callback:any ) => {
    const mailbox = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$')
    if (!mailbox.test(value)) {
      return callback(new Error('请输入正确格式的邮箱！'))
    } else {
      callback()
    }
  }
  // 身份证号
  const validateIdCardNo = (rule: string, value: string, callback:any ) => {
    const mailbox = new RegExp('^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$')
    if (!mailbox.test(value)) {
      return callback(new Error('请输入正确格式的身份证号！'))
    } else {
      callback()
    }
  }
  export default {
    common: {
      // ---------------------公共验证方法
      phone: [{// 手机号
        required: true,
        message: '手机号不能为空'
      }, {
        validator: validatePhone,
        trigger: 'blur'
      }],
      email: [{// 邮箱
          required: true,
          message: '邮箱不能为空'
        },
        {
          validator: validateEmail,
          trigger: 'blur'
        }
      ],
      idCardNo: [{// 身份证号码
          required: true,
          message: '身份证号码不能为空'
        },
        {
          validator: validateIdCardNo,
          trigger: 'blur'
        }
      ]
    },
    handle: {
      // ---------------------处理表单的验证方法
      operResult: [{//处理结果
        required: true,
        message: '请选择处理结果'
      }],
      opinion: [{//处理结果描述
        required: true,
        message: '请填写处理结果描述'
      }]
    },
  }