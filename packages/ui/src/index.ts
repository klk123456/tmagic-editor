/*
 * Tencent is pleased to support the open source community by making TMagicEditor available.
 *
 * Copyright (C) 2023 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import BackHome from "./back_home";
import BgContent from "./bg_content";
import Bootombutton from "./bottom_button";
import Button from "./button";
import CallManager from "./call_manager";
import Carousel from "./carousel";
import Container from "./container";
import FrameContent from "./frame_content";
import Img from "./img";
import Navigation from "./navigation";
import Overlay from "./overlay";
import Page from "./page";
import PageTimer from "./pagetimer";
import Qrcode from "./qrcode";
// import Sound from './sound';
import Steps from "./steps";
import Text from "./text";
import Progress from "./progress";
import Ul from "./ul";
import Li from "./li";
import Ol from "./ol";
import selectDiv from "./select_div";
import FlexFor from "./flexfor";
import Input from "./input";
import Link from "./el_link";
import Badge from "./el_badge";
import Card from "./el_card";
import Tabs from "./el_tabs";
import TabPane from "./el_tab_pane";
import Menu from "./el_menu";
import MenuItem from "./el_menu_item";
import ELDatePicker from "./el_date_picker";
import ElSelect from "./el_select";
import ElOption from "./el_option";
import Table from "./table";
import Thead from "./thead";
import Th from "./th";
import Tr from "./tr";
import Td from "./td";
import Tbody from "./tbody";
import Scroll from "./scroll";
import BallonToolTip from "./ballon_tool_tip";
import ClientConfirm from "./client_confirm";
import ZJdialog from "./zj_dialog";
import PercentButton from "./percent_button";
import ELPaging from "./el_paging";
import paperInput from "./paper_input";
import popUp from "./popUp";

const ui: Record<string, any> = {
  page: Page,
  container: Container,
  button: Button,
  text: Text,
  img: Img,
  qrcode: Qrcode,
  overlay: Overlay,
  steps: Steps,
  bottombutton: Bootombutton,
  pagetimer: PageTimer,
  backhome: BackHome,
  framecontent: FrameContent,
  bgcontent: BgContent,
  callmanager: CallManager,
  navigation: Navigation,
  carousel: Carousel,
  progress: Progress,
  ul: Ul,
  ol: Ol,
  li: Li,
  select_div: selectDiv,
  flexfor: FlexFor,
  input: Input,
  link: Link,
  badge: Badge,
  card: Card,
  tabs: Tabs,
  tabpane: TabPane,
  menu: Menu,
  menuitem: MenuItem,
  datepicker: ELDatePicker,
  elselect: ElSelect,
  eloption: ElOption,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  th: Th,
  tr: Tr,
  td: Td,
  scroll: Scroll,
  ballontooltip: BallonToolTip,
  clientconfirm: ClientConfirm,
  zjdialog: ZJdialog,
  percentbutton: PercentButton,
  elpaging:ELPaging,
  paperinput:paperInput,
  popup: popUp
};

export default ui;
