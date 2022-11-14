const isString = function(text: unknown): text is string  {
  return typeof text === "string"
}

const checkString = function(  inputdata: string,
  key: string,
  rule: string | object,
  label: string
){
  let errormsg = ""
  const length = {
    max: function(val: string, setVal: string){
      const intsetVal = (parseInt(setVal)+1)/10000
      const textsetVal = parseInt(setVal)>=99999999 ? intsetVal.toFixed(4).replace(".0000","")+"億円" : setVal+"万円"
      const msg = parseInt(val) <= parseInt(setVal) ? ""
                  :"が"+textsetVal+"を超える場合は、"+setVal+"万円でご入力ください"
      return msg
    },
    min: function(val: string, setVal: string){
      const msg = parseInt(val) > parseInt(setVal) ? ""
                  :"が"+setVal+"万円未満の方は、本サービスをお取り扱いできません"
      return msg
    },
    textMax: function(val: string, setVal: string){
      const msg = val.length <= parseInt(setVal) ? ""
                  :"は"+setVal+"文字以内にしてください"
      return msg
    },
    textMin: function(val: string, setVal: string){
      const msg = val.length > parseInt(setVal) ? ""
                  :"は"+setVal+"文字以上でなければなりません"
      return msg
    }
  }

  const pattern = {
    matches: "は半角数字で入力してください",
    email: "有効なメールアドレスの形式ではないようです",
  }

  const pattern2 = {
    noHyphen: "にハイフンは不要です",
    headZero: "に冒頭の0は不要です",
  }

  if(key === "required"){

    rule === "true" && !inputdata ? errormsg=label+"は必須項目です" : ""

  }else if(Object.keys(length).includes(key)){

    const re = isString(rule)? rule : ""
    const msg = length[key as keyof typeof length](inputdata,re)
    errormsg = msg ? label+msg : ""

  }else{

    const re = isString(rule)? new RegExp(rule) : null
    if(Object.keys(pattern2).includes(key)){
      if(re?.test(inputdata)){
        errormsg = label + pattern[key as keyof typeof pattern]
      }else{
        errormsg=""
      }
    }else{
      if(!re?.test(inputdata)){
        errormsg = key === "email"? pattern[key as keyof typeof pattern] : label + pattern[key as keyof typeof pattern]
      }else{
        errormsg=""
      }
    }
  }
  return errormsg;
}

export default checkString
