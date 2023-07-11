import { FolderOpened, Grid, PictureFilled, SwitchButton, Tickets } from '@element-plus/icons-vue';

export default [
  {
    title: '示例容器',
    items: [
      {
        icon: FolderOpened,
        text: '组',
        type: 'container',
      },
      {
        icon: FolderOpened,
        text: '蒙层',
        type: 'overlay',
      },
    ],
  },
  {
    title: '示例组件',
    items: [
      {
        icon: Tickets,
        text: '文本',
        type: 'text',
      },
      // {
      //   icon: SwitchButton,
      //   text: '按钮',
      //   type: 'button',
      // },
      {
        icon: PictureFilled,
        text: '图片',
        type: 'img',
      },
      // {
      //   icon: Grid,
      //   text: '二维码',
      //   type: 'qrcode',
      // },
      // {
      //   icon: Grid,
      //   text: '步骤',
      //   type: 'steps',
      // },
      // {
      //   icon: Tickets,
      //   text: '测试组件',
      //   type: 'test',
      // },
    ],
  },
  {
    title: '组合',
    items: [
      {
        icon: Tickets,
        text: '弹窗',
        data: {
          type: 'overlay',
          style: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          name: '弹窗',
          items: [
            {
              type: 'container',
              style: {
                position: 'absolute',
                width: '80%',
                height: '400',
                top: '143.87',
                left: 37.5,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
              },
              name: '组',
              items: [],
              layout: 'absolute',
            },
          ],
        },
      },
    ],
  },
  {
    title: '基础组件',
    items: [
      {
        icon: Tickets,
        text: 'ul',
        type: 'ul',
      },
      {
        icon: Tickets,
        text: 'ol',
        type: 'ol',
      },
      {
        icon: Tickets,
        text: 'li',
        type: 'li',
      },
    ],
  },
  {
    title: '自定义组件',
    items: [
      {
        icon: Tickets,
        text: '底部按钮',
        type: 'bottombutton',
      },
      {
        icon: Tickets,
        text: '定时器',
        type: 'pagetimer',
      },
      // {
      //   icon: Tickets,
      //   text: 'sound',
      //   type: 'sound11',
      // },
      {
        icon: Tickets,
        text: '导航栏',
        type: 'navigation',
      },
      {
        icon: Tickets,
        text: '容器',
        type: 'framecontent',
      },
      {
        icon: Tickets,
        text: '呼叫',
        type: 'callmanager',
      },
      {
        icon: Tickets,
        text: '返回主页',
        type: 'backhome',
      },
      {
        icon: Tickets,
        text: '图片背景',
        type: 'bgcontent',
      },
      {
        icon: Tickets,
        text: '轮播图',
        type: 'carousel',
      },
      {
        icon: Tickets,
        text: '进度条',
        type: 'progress',
      },
      {
        icon: Tickets,
        text: '选中框',
        type: 'select_div',
      },
    ],
  },
];
