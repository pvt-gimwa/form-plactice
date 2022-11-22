// Date.stories.ts

import Date from '../../components/Form/Date.vue'
import { Meta, StoryFn } from '@storybook/vue';


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Form/Date',
  component: Date,
  argTypes: {
    type: {
      options: ['text', 'textarea'],
      control: { type: 'select' },
    },
    name: {
      options: ['Date'],
      control: { type: 'select' },
    },
    classProp: {
      options: ['simulation__form__group__item__wrap__Date'],
      control: { type: 'select' },
    },
    label: {
      options: ['テストDate'],
      control: { type: 'select' },
    },
    option: {
      options: [''],
      control: { type: 'select' },
    },
    unit: {
      options: ['万円'],
      control: { type: 'Date' },
    },
    value: {
      options: ['　'],
      control: { type: 'Date' },
    },
    validationProp: {
      required: "true"
    },
    formstate: {
      isCompleted: false,​
      isConfirm: false,
​      isForm: true
    }
  },
} as Meta<typeof Date>

const DateTemplate: StoryFn<typeof Date> = (args: any, { argTypes }: any) => ({
  components: { Date },
  props: Object.keys(argTypes),
  template: '<Date v-bind="$props" />',
});

export const dateYM = DateTemplate.bind({})
dateYM.args = { 
  type: 'text',
  name: 'Date',
  classProp: 'simulation__form__group__item__wrap__Date',
  label: 'TEST LABEL',
  option: {
    mode: "ym",
    data: ['1990','1991','1992']
  },
  unit: '年-月',
  value: '',
  validationProp: {
    required: "true"
  },
  formstate: {
    isCompleted: false,​
    isConfirm: false,
​    isForm: true
  } 
} as any

export const dateYMD = DateTemplate.bind({})
dateYMD.args = { 
  type: 'text',
  name: 'Date',
  classProp: 'simulation__form__group__item__wrap__Date',
  label: 'TEST LABEL',
  option: {
    mode: "ymd",
    data: ['1990','1991','1992']
  },
  unit: '年-月-日',
  value: '',
  validationProp: {
    required: "true"
  },
  formstate: {
    isCompleted: false,​
    isConfirm: false,
​    isForm: true
  } 
} as any
