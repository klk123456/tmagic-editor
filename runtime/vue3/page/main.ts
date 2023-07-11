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

import { createApp, defineAsyncComponent } from 'vue';
import ElementPlus from 'element-plus'; // 引入element-plus库

import Core from '@tmagic/core';
import { getUrlParam } from '@tmagic/utils';

import components from '../.tmagic/async-comp-entry';
import plugins from '../.tmagic/plugin-entry';
import MessageBox from '../component/Messagebox.vue';

import request from './utils/request';
import AppComponent from './App.vue';
import { getLocalConfig } from './utils';

import 'element-plus/dist/index.css'; // 引入element-plus样式

const magicApp = createApp(AppComponent);
magicApp.use(ElementPlus);
magicApp.use(request);
magicApp.component('messagebox', MessageBox);

Object.entries(components).forEach(([type, component]: [string, any]) => {
  magicApp.component(`magic-ui-${type}`, defineAsyncComponent(component));
});

Object.values(plugins).forEach((plugin: any) => {
  magicApp.use(plugin);
});

const designWidth = document.documentElement.getBoundingClientRect().width;

const app = new Core({
  designWidth,
  config: ((getUrlParam('localPreview') ? getLocalConfig() : window.magicDSL) || [])[0] || {},
  curPage: getUrlParam('page'),
});

magicApp.config.globalProperties.app = app;
magicApp.provide('app', app);

magicApp.mount('#app');
