// electron
import { Menu } from 'electron';

/**
 * setApplicationMenu
 * @param {*} menus
 * @param {*} showDevtools
 */
export const setApplicationMenu = (menus, showDevtools) => {
  const defaultMenus = [
    {
      label: 'app',
      submenu: [
        {
          label: '关于',
          role: 'about',
        },
        {
          type: 'separator',
        },
        {
          label: '隐藏',
          role: 'hide',
        },
        {
          label: '隐藏其他',
          role: 'hideOthers',
        },
        {
          type: 'separator',
        },
        {
          label: '退出',
          role: 'quit',
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        {
          label: '撤销',
          role: 'undo',
        },
        {
          label: '重做',
          role: 'redo',
        },
        {
          type: 'separator',
        },
        {
          label: '剪切',
          role: 'cut',
        },
        {
          label: '复制',
          role: 'copy',
        },
        {
          label: '粘贴',
          role: 'paste',
        },
        {
          label: '删除',
          role: 'delete',
        },
        {
          label: '选中所有',
          role: 'selectAll',
        },
      ],
    },
    {
      label: '窗口',
      submenu: [
        {
          label: '最小化',
          role: 'minimize',
        },
        {
          label: '关闭',
          role: 'close',
        },
        {
          label: '自动全屏',
          role: 'togglefullscreen',
        },
      ],
    },
  ];
  if (showDevtools)
    defaultMenus.push({
      label: '调试',
      submenu: [
        {
          label: '调试',
          role: 'toggleDevTools',
        },
      ],
    });

  // final menus
  const finalMenus = menus && menus.length ? menus : defaultMenus;
  const finalMenuTemplate = Menu.buildFromTemplate(finalMenus);

  // set menus
  Menu.setApplicationMenu(process.platform === 'darwin' ? finalMenuTemplate : null);
};
