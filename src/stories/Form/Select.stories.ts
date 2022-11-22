// Select.stories.ts

import Select from '../../components/Form/Select.vue'
import { Meta, StoryFn } from '@storybook/vue';


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Form/Select',
  component: Select,
  argTypes: {
    type: {
      options: ['text', 'textarea'],
      control: { type: 'select' },
    },
    name: {
      options: ['Select'],
      control: { type: 'select' },
    },
    classProp: {
      options: ['simulation__form__group__item__wrap__Select'],
      control: { type: 'select' },
    },
    label: {
      options: ['テストSelect'],
      control: { type: 'select' },
    },
    option: {
      options: [''],
      control: { type: 'select' },
    },
    unit: {
      options: ['万円'],
      control: { type: 'Select' },
    },
    value: {
      options: ['　'],
      control: { type: 'Select' },
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
} as Meta<typeof Select>

const SelectTemplate: StoryFn<typeof Select> = (args: any, { argTypes }: any) => ({
  components: { Select },
  props: Object.keys(argTypes),
  template: '<Select v-bind="$props" />',
});

export const select = SelectTemplate.bind({})
select.args = { 
  type: 'text',
  name: 'Select',
  classProp: 'simulation__form__group__item__wrap__Select',
  label: 'TEST LABEL',
  option: {
    mode: "",
    data: ['SELECT 1','SELECT 2','SELECT 3']
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
