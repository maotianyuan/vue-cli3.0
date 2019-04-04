import Vue from 'vue'
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Input,
  Popover,
  Tag,
  Dialog,
  Tooltip,
  Pagination,
  Select,
  Option,
  Tabs,
  TabPane,
  Autocomplete,
  Col,
  Row,
  Form,
  FormItem,
  Message,
  MessageBox,
  Cascader,
  DatePicker,
  Radio,
  RadioGroup,
  ButtonGroup,
  Loading,
  Upload,
  Scrollbar,
  Container,
  Aside,
  Header,
  Main,
  Submenu,
  MenuItem,
  Checkbox,
  Progress,
  CheckboxGroup,
  MenuItemGroup
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Autocomplete)
Vue.use(Col)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Cascader)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Upload)
Vue.use(Scrollbar)
Vue.use(Loading.directive)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(ButtonGroup)
Vue.use(MenuItemGroup)
Vue.use(Progress)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
