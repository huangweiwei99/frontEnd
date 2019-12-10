export default {
  route: {
    dashboard: '首页',
    introduction: '简述',
    documentation: '文档',
    permission: '权限测试页',
    icons: '图标',
    components: '组件',
    componentIndex: '介绍',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    Table: '表格',
    dynamicTable: '动态table',
    dragTable: '拖拽table',
    inlineEditTable: 'table内编辑',
    complexTable: '综合表格',
    tab: 'Tab',
    form: '表单',
    createForm: '创建表单',
    editForm: '编辑表单',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'excel',
    exportExcel: '导出 excel',
    selectExcel: '导出 selected',
    uploadExcel: '上传 excel',
    exportZip: '导出zip压缩文件',
    theme: '换肤',
    clipboardDemo: 'clipboard',
    i18n: '国际化',
    tree: '树形菜单',
    wms: '仓库管理系统',
    product: '产品管理',
    supplier: '供应商管理',
    purchase: '采购管理',
    order: '订单管理',
    account: '账户中心',
    settings: '系统设置'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    reset: '重置',
    advance: '高级',
    add: '添加',
    export: '导出',
    import: '导入',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    idasc: 'ID顺序',
    iddesc: 'ID倒序',
    loadingText: '给我一点时间',
    range: '排序',
    sortFiled: '排序域',
    exportFileName: '文件名',
    return: '返回',
    sync: '同步',
    save: '保存'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入要导出文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tags: {
    close: '关闭',
    closeothers: '关闭其他',
    closeall: '关闭所有'
  },
  product: {
    name: '产品名称',
    sku: 'SKU',
    // weight: '净重量',
    // size: '净尺寸',
    weight: '包装重量',
    dimension: '包装尺寸',
    remark: '备注',
    info: '产品信息',
    images: '产品图片'
  },
  supplier: {
    name: '供应商',
    platform: '平台',
    address: '地址'
  },
  purchase: {
    date: '采购日期',
    purchasetransid: '交易号',
    optsupplier: '请选择供应商',
    place: '采购地点',
    quantity: '采购数量',
    cost: '价格'
  },
  order: {
    date: '交易日期',
    transId: '交易号',
    agent: '快递代理',
    express: '快递',
    postage: '邮费',
    status: '状态',
    account: '账号',
    dateRange: '日期范围',
    platform: '平台',
    sync: '同步',
    orderId: '订单号'
  },
  settings: {
    name: '系统名称',
    description: '页面描述',
    allowOrgin: '跨域允许',
    addUrlTag: '添加URL'
  },
  statistic: {
    orderQuantity: '订单总数',
    orderAmount: '订单总额',
    productQuantity: '产品总数',
    purchaseAmount: '采购总额'
  },
  user: {
    name: '用户名',
    email: '电子邮件',
    status: '状态',
    phone: '手机',
    password: '密码'
  },
  rule: {
    productName: '产品名称不能空',
    SKU: 'SKU不能为空'
  },
  form: {
    create: '创建',
    edit: '编辑'
  },
  Create: '创建',
  Edit: '编辑'
}
