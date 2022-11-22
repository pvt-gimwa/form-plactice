// Input.stories.ts

import Input from '../../components/Form/Input.vue'
import { Meta, StoryFn } from '@storybook/vue';


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Form/Input',
  component: Input,
  argTypes: {
    type: {
      options: ['text', 'textarea'],
      control: { type: 'select' },
    },
    name: {
      options: ['input'],
      control: { type: 'select' },
    },
    classProp: {
      options: ['simulation__form__group__item__wrap__input'],
      control: { type: 'select' },
    },
    label: {
      options: ['テストINPUT'],
      control: { type: 'select' },
    },
    option: {
      options: [''],
      control: { type: 'select' },
    },
    unit: {
      options: ['万円'],
      control: { type: 'input' },
    },
    value: {
      options: ['　'],
      control: { type: 'input' },
    },
    validationProp: {
      required: "true"
    },
    state: {
      isCompleted: false,​
      isConfirm: false,
    ​      isForm: true
    }
  },
} as Meta<typeof Input>

const InputTemplate: StoryFn<typeof Input> = (args: any, { argTypes }: any) => ({
  components: { Input },
  props: Object.keys(argTypes),
  template: '<Input v-bind="$props" />',
});

export const input = InputTemplate.bind({})
input.args = { 
  type: 'text',
  name: 'input',
  classProp: 'simulation__form__group__item__wrap__input',
  label: 'TEST LABEL',
  option: {
    mode: "",
    data: []
  },
  unit: '万円',
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

export const textarea = InputTemplate.bind({})
textarea.args = { 
  type: 'textarea',
  name: 'input',
  classProp: 'simulation__form__group__item__wrap__textarea',
  label: 'TEST TEXTAREA',
  option: {
    mode: "",
    data: []
  },
  unit: '',
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
