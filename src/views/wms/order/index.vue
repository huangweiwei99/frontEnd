<template>
  <div class="app-container calendar-list-container">
    <!-- 过滤器 -->
    <div class="filter-container">
      <el-button
        class="filter-item"
        icon="el-icon-third-iconset0349"
        @click="handleSync"
      >{{$t('table.sync')}}</el-button>
      <span class="right">
        <el-button
          class="filter-item"
          icon="el-icon-third-query1"
          @click="handleAdanceToggle"
          style="float:right"
        >{{$t('table.advance')}}</el-button>
      </span>
      <div
        class="form-container"
        v-if="advanceVisable"
      >
        <el-row :gutter="24">
          <el-form
            label-position="left"
            label-width="70px"
          >

          <el-col
              :span="4"
              :xs="24"
              :sm="12"
              :lg="8"
            >
              <el-form-item
                :label="$t('order.orderId')"
                prop="orderId"
              >
                <el-input
                  v-model="listQuery.orderId"
                  prefix-icon="el-icon-third-dingdan"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="4"
              :xs="24"
              :sm="12"
              :lg="8"
            >
              <el-form-item
                :label="$t('order.transId')"
                prop="transId"
              >
                <el-input
                  v-model="listQuery.transId"
                  prefix-icon="el-icon-third-jiaoyisuo"
                ></el-input>
              </el-form-item>
            </el-col>
           
            <el-col
              :span="4"
              :xs="24"
              :sm="12"
              :lg="8"
            >
              <el-form-item
                :label="$t('order.status')"
                prop="status"
                style="float:right"
              >
                <el-select
                  v-model="listQuery.status"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row :gutter="24">
          <el-form
            label-position="left"
            label-width="70px"
          >
             <el-col
              :span="4"
              :xs="24"
              :sm="12"
              :lg="12"
            >
              <el-form-item
                :label="$t('order.date')"
                prop="date"
              >
                <!-- <el-input v-model="listQuery.date" prefix-icon="el-icon-edit"></el-input> -->
                <el-date-picker
                  v-model="listQuery.date"
                  type="daterange"
                  format="yyyy 年 MM 月 dd 日"
                  align="right"
                  unlink-panels
                  range-separator="至 "
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col
              :span="4"
              :xs="24"
              :sm="12"
              :lg="12"
            >
              <el-form-item style="margin-bottom:50px">
                <span style="float:right">
                  <el-button-group class="filter-containter-button-group">
                    <el-button
                      plain
                      icon="el-icon-search"
                      @click="handleFilter"
                    >{{$t('table.search')}}</el-button>
                    <el-button
                      plain
                      icon="el-icon-refresh"
                      @click="handleAdvanceReset"
                    >{{$t('table.reset')}}</el-button> 
                  </el-button-group>

                </span>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row :gutter="24">
          <el-form
            label-position="left"
            label-width="70px"
          >
            <el-col
              :span="6"
              :xs="24"
              :sm="12"
              :lg="12"
            >
              <el-form-item :label="$t('table.exportFileName')">
                  <el-input
                    :placeholder="$t('excel.placeholder')"
                    prefix-icon="el-icon-document"
                    v-model="filename"
                  ></el-input>
                </el-form-item>
            </el-col>
            <el-col
              :span="6"
              :xs="24"
              :sm="12"
              :lg="12"
            >
              <!-- <el-form-item  style="float:right">
                <input
                  id="excel-upload-input"
                  type="file"
                  accept=".xlsx, .xls"
                  class="c-hide"
                  @change="handleFileChange"
                ><span style="float:right">
                  <el-button-group class="filter-containter-button-group">
                    <el-button
                      
                      icon="el-icon-upload2"
                      @click="handleUpload"
                    >{{$t('table.import')}}</el-button>
                    <el-button
                     
                      icon="el-icon-download"
                      @click="handleDownload"
                      :loading="downloadLoading"
                      v-waves
                    >{{$t('table.export')}}</el-button>
                  </el-button-group>
                </span>
              </el-form-item> -->
              <el-form-item style="margin-bottom:50px">
                <input
                  id="excel-upload-input"
                  type="file"
                  accept=".xlsx, .xls"
                  class="c-hide"
                  @change="handleFileChange"
                >
                <span style="float:right">
                  <el-button-group class="filter-containter-button-group">
                    <el-button
                      
                      icon="el-icon-upload2"
                      @click="handleUpload"
                    >{{$t('table.import')}}</el-button>
                    <el-button
                     
                      icon="el-icon-download"
                      @click="handleDownload"
                      :loading="downloadLoading"
                      v-waves
                    >{{$t('table.export')}}</el-button> 
                  </el-button-group>

                </span>
              </el-form-item>
            </el-col>
          </el-form>

        </el-row>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :key='tableKey'
      :data="list"
      v-loading="listLoading"
      :element-loading-text="$t('table.loadingText')"
      border
      fit
      highlight-current-row
      :default-sort="{prop: 'id', order: 'descending'}"
      @sort-change="handleSort"
      @selection-change="handleSelectionChange"
      class="data-table"
    >
      <el-table-column
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        width="160px"
        align="center"
        sortable="custom"
        prop="date"
        :label="$t('order.date')"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <span>{{scope.row.date | parseTime('{y}-{m}-{d}')}}</span>
          <!-- <span>{{scope.row.date}}</span> -->
        </template>
      </el-table-column>
      <el-table-column
        min-width="265px"
        align="center"
        :label="$t('order.orderId')"
        sortable="custom"
        prop="orderId"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="handleUpdate(scope.row)"
          >{{scope.row.orderId}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="265px"
        align="center"
        :label="$t('order.transId')"
        sortable="custom"
        prop="transId"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="handleUpdate(scope.row)"
          >{{scope.row.transId}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="130px"
        align="center"
        :label="$t('order.express')"
        sortable="custom"
        prop="express"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <span>{{scope.row.express}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('order.status')"
        sortable="custom"
        prop="status"
        width="95"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <el-tag
            :type="parseOrderStatusTag(scope.row.status)"
            disable-transitions
            sortable="custom"
            prop="status"
          >{{scope.row.status | parseOrderStatus()}}</el-tag>
          <!-- <span>{{scope.row.status | parseOrderStatus()}}</span> -->
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="150"
        prop="action"
        class-name="small-padding fixed-width"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
          >{{$t('table.edit')}}</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('table.delete')}}
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页导航 -->
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :layout="this.$store.state.app.pagation.layout"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 同步订单对话框 -->
    <el-dialog
      :title="$t('order.sync')"
      :visible.sync="syncFormVisible"
      :before-close="cancelSyncData"
      center
      :fullscreen="this.$store.state.app.dialog.fullScreen"
    >
      <template>
        <div v-show="syncProcessVisable">
          <el-progress
            :percentage="processing"
            :text-inside="true"
            :stroke-width="18"
            color="rgba(142, 113, 199, 0.7)"
          ></el-progress>

        </div>

        <el-form
          :rules="rules"
          ref="syncDataForm"
          :model="sync"
          label-position="left"
          label-width="80px"
          style='width: 400px; margin-left:50px;'
        >

          <el-form-item
            :label="$t('order.dateRange')"
            prop="dateRange"
          >
            <el-date-picker
              v-model="sync.dateRange"
              type="daterange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            :label="$t('order.platform')"
            prop="platform"
          >
            <el-select
              v-model="sync.platform"
              placeholder="请选择"
            >
              <el-option
                v-for="item in platformOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('order.account')"
            prop="account"
          >
            <el-select
              v-model="sync.account"
              placeholder="请选择"
            >
              <el-option
                v-for="item in accountOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="cancelSyncData"
          icon="el-icon-close"
        >{{$t('table.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="syncData"
          icon="el-icon-check"
        >{{$t('order.sync')}}</el-button>
      </div>
    </el-dialog>

    <!-- 编辑菜单对话框 -->
    <el-dialog
      title="编辑菜单"
      :visible.sync="editFormVisible"
    >
      <template>
        <el-form
          label-position="left"
          ref="editDataForm"
          label-width="80px"
          :model="order"
          style='width: 400px; margin-left:50px;'
        >
          <el-form-item
            :label="$t('order.date')"
            prop="dateRange"
          >
            <el-date-picker
              v-model="order.date"
              type="date"
              placeholder="选择日期"
              :disabled="true"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            :label="$t('order.orderId')"
            prop="orderId"
          >
            <el-input
              v-model="order.orderId"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item
            :label="$t('order.agent')"
            prop="agent"
          >
            <el-select
              v-model="order.agent"
              placeholder="请选择"
            >
              <el-option
                v-for="item in agentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item
            :label="$t('order.express')"
            prop="express"
          >
            <!-- <el-select
              v-model="order.express"
              placeholder="请选择"
            >
              <el-option
                v-for="item in expressOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->

            <el-cascader
              v-model="order.ExpressService"
              placeholder="试试搜索：DHL"
              :options="expressOptions2"
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item
            :label="$t('order.postage')"
            prop="postage"
          >
            <el-input v-model="order.postage"></el-input>
            <!-- <el-select v-model="order.postage" placeholder="请选择">
              <el-option v-for="item in expressOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item
            :label="$t('order.status')"
            prop="status"
          >
            <el-select
              v-model="order.status"
              placeholder="请选择"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            @click="cancelEditData"
            icon="el-icon-close"
          >{{$t('table.cancel')}}</el-button>
          <el-button
            type="primary"
            @click="updateData"
            icon="el-icon-check"
          >{{$t('order.sync')}}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPrecentage, updateOrder, fetchExpress } from '@/api/order'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import XLSX from 'xlsx'

export default {
  name: 'productTable',
  directives: {
    waves
  },
  data() {
    var checkDateRange = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('时间跨度不能为空'))
      } else {
        callback()
      }
    }
    var checkPlatform = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('平台不能为空'))
      } else {
        callback()
      }
    }
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var checkOrderDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('订单日期不能为空'))
      } else {
        callback()
      }
    }
    var checkOrderId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('订单ID不能为空'))
      } else {
        callback()
      }
    }
    var checkExpress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('快递不能为空'))
      } else {
        callback()
      }
    }
    var checkStatus = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('状态不能为空'))
      } else {
        callback()
      }
    }
    return {
      tableKey: 0,
      activeName: 'first',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        date: '',
        transId: '',
        orderId: '',
        status: null,
        express: null,
        sort: 'orderId',
        order: 'desc'
      },
      temp: {
        id: undefined,
        dateRange: '',
        account: '',
        platform: ''
      },
      sync: {
        dateRange: '',
        account: '',
        platform: ''
      },
      order: {
        id: '',
        date: '',
        transId: '',
        // agent: '',
        // express: '',
        ExpressService: [],
        postage: null,
        status: null
      },
      syncFormVisible: false,
      syncProcessVisable: false,
      editFormVisible: false,
      processing: 0,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      advanceVisable: false,
      rules: {
        platform: [{ required: true, validator: checkPlatform, trigger: 'blur' }],
        dateRange: [{ required: true, validator: checkDateRange, trigger: 'blur' }],
        account: [{ required: true, validator: checkAccount, trigger: 'blur' }],
        date: [{ required: true, validator: checkOrderDate, trigger: 'blur' }],
        orderId: [{ required: true, validator: checkOrderId, trigger: 'blur' }],
        express: [{ required: true, validator: checkExpress, trigger: 'blur' }],
        status: [{ required: true, validator: checkStatus, trigger: 'blur' }]
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            // const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      platformOptions: [{
        value: '1',
        label: 'ebay'
      }, {
        value: '2',
        label: 'aliexpress'
      }, {
        value: '3',
        label: '其他'
      }],
      accountOptions: [{
        value: '1',
        label: 'vson.mail@gmail.com'
      }, {
        value: '2',
        label: 'happymama888@gmail.com'
      }, {
        value: '3',
        label: '其他'
      }],
      agentOptions: [{
        value: 1,
        label: '出口易'
      }, {
        value: 3,
        label: '三态速递'
      }, {
        value: 4,
        label: '递四方物流'
      }],
      expressOptions: [{
        value: 'RM1R',
        label: 'RM1R'
      }, {
        value: 'UPS',
        label: 'UPS'
      }, {
        value: 'DHL',
        label: 'DHL'
      }],
      statusOptions: [{
        value: 1,
        label: '已同步'
      }, {
        value: 2,
        label: '未处理'
      }, {
        value: 3,
        label: '发货中'
      }, {
        value: 4,
        label: '已发货'
      }, {
        value: 5,
        label: '运输中'
      }, {
        value: 6,
        label: '已签收'
      }, {
        value: 7,
        label: '已完成'
      }],
      expressOptions2: [],
      downloadLoading: false,
      multipleSelection: [],
      filename: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 数据列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        if (response.code === 200) {
          fetchExpress({}).then((response) => {
            if (response.code === 200) {
              const options = []
              response.data.items.forEach(agent => {
                const children = []
                agent.service.forEach(express => {
                  children.push({ value: express, label: express })
                  // console.log(children)
                })
                options.push({ value: agent.agent, label: this.parseOrderAgent(agent.agent), children: children })
              })
              this.expressOptions2 = options
            }
          })
        }
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    renderHeader(h, { column }) { // h即为cerateElement的简写，具体可看vue官方文档
      // console.log(column)
      let icon = ''
      switch (column.property) {
        case 'date':
          icon = 'el-icon-date'
          break
        case 'orderId':
          icon = 'el-icon-third-dingdan'
          break
        case 'transId':
          icon = 'el-icon-third-jiaoyisuo'
          break
        case 'express':
          icon = 'el-icon-third-order_receive'
          break
        case 'status':
          icon = 'el-icon-third-ecs-running'
          break
        case 'action':
          icon = 'el-icon-third-caozuogongneng'
          break
        default:
          break
      }
      return h(
        'span',
        [

          h('i', {
            class: icon,
            style: 'padding-right:5px'
          }),
          h('span', column.label)
        ],
      )
    },
    parseOrderStatusTag(val) {
      switch (val) {
        case 1:
          return 'info'
        case 2:
          return 'danger'
        case 3:
          return 'warning'
        case 4:
          return ''
        case 7:
          return 'success'
        default:
          return 'success'
      }
    },
    parseOrderAgent(val) {
      switch (val) {
        case 1:
          return '出口易'
        case 3:
          return '三态速递'
        case 4:
          return '递四方物流'
        default:
          break
      }
    },
    // 数据过滤
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 改变每页项数
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    // 当前页
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 远程排序
    handleSort(val) {
      this.listQuery.page = 1
      this.listQuery.sort = val.prop
      switch (val.order) {
        case 'ascending':
          val.order = 'asc'
          break
        case 'descending':
          val.order = 'desc'
          break
        default:
          val.order = null
          break
      }
      this.listQuery.order = val.order
      this.getList()
    },
    // 重置临时数据
    resetTemp() {
      this.temp = {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        name: '',
        sku: '',
        packageWeight: '',
        packageSize: ''
      }
    },
    resetOrder() {
      this.order = {
        id: '',
        date: '',
        transId: '',
        // agent: '',
        ExpressService: [],
        postage: null,
        status: null
      }
    },
    handleSync() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.syncFormVisible = true
      this.$nextTick(() => {
        this.$refs['syncDataForm'].clearValidate()
      })
    },
    syncData() {
      console.log('同步中。。。')
      this.syncProcessVisable = true
      var _this = this
      fetchPrecentage(_this.sync).then((response) => {
        if (response.code === 200) {
          // var i = 5000
          // _this.processing = response.data
          var Interval = () => {
            var i = 1000
            if (_this.processing < 100) {
              fetchPrecentage(_this.sync).then((res) => {
                i = i + 1000
                _this.processing = res.data
                console.log(i)
              }).catch(console.log('出错' + i))
            } else if (_this.processing === 100) {
              _this.getList()
              console.log('完成同步')
              _this.cancelSyncData()
              clearInterval(_this.time)
            }
            return i
          }
          _this.time = setInterval(Interval, 5000)
        }
      }).catch((error) => { console.log(error) })

      // _this.time = setInterval(function() {
      //   if (_this.processing < 100) {
      //     console.log(10)
      //     fetchPrecentage().then(response => {
      //       if (response.code === 200) {
      //         console.log(response.data)
      //         _this.processing = response.data
      //       }
      //     })
      //   } else if (_this.processing === 100) {
      //     _this.getList()
      //     console.log('完成同步')
      //     _this.cancelSyncData()
      //     clearInterval(_this.time)
      //   }
      // }, 5000)
    },

    cancelSyncData() {
      clearInterval(this.time)
      this.syncFormVisible = false
      this.syncProcessVisable = false
      this.processing = 0
      this.fileList = []
    },
    // handleEdit() {
    //   this.editFormVisible = true
    // },
    // 处理创建表单
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.syncFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    // 处理更新表单
    handleUpdate(row) {
      this.editFormVisible = true
      this.order = Object.assign({}, row)
      this.order.ExpressService = [row.agent, row.express]
      this.order.date = parseTime(row.date)
      console.log(row.agent)
      // this.fileList = row.images
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'
      // this.syncFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    // 更新数据
    updateData() {
      this.$refs['editDataForm'].validate((valid) => {
        if (valid) {
          console.log(this.order.ExpressService[0])
          // const tempData = Object.assign({}, this.temp)
          const tempData = {
            id: this.order.id,
            agent: this.order.ExpressService[0],
            postage: this.order.postage,
            express: this.order.ExpressService[1],
            // express: this.order.express,
            status: this.order.status
          }

          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // console.log(tempData)
          updateOrder(tempData).then((response) => {
            if (response.code === 200) {
              this.editFormVisible = false
              this.resetOrder()
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
          // updateProduct(tempData).then(() => {
          //   for (const v of this.list) {
          //     if (v.id === this.temp.id) {
          //       const index = this.list.indexOf(v)
          //       this.list.splice(index, 1, this.temp)
          //       break
          //     }
          //   }
          //   this.syncFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '更新成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    cancelEditData() {
      this.editFormVisible = false
    },
    // 处理删除数据
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    // 高级面板
    handleAdanceToggle() {
      this.advanceVisable = !this.advanceVisable
    },
    handleAdvanceReset() {
      this.listQuery.page = 1
      this.listQuery.orderId = null
      this.listQuery.transId = null
      this.listQuery.express = null
      this.listQuery.status = null
      this.listQuery.order = 'desc'
      this.listQuery.sort = 'orderId'
      this.getList()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传
    handleUpload() {
      document.getElementById('excel-upload-input').click()
    },
    handleFileChange(e) {
      const files = e.target.files
      const itemFile = files[0] // only use files[0]
      // console.log(itemFile)
      this.readerData(itemFile)
    },
    readerData(itemFile) {
      console.log(itemFile)
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target.result
        const fixedData = this.fixdata(data)
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.get_header_row(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        console.log({ header, results })
        this.generateDate({ header, results })
      }
      // reader.readAsArrayBuffer(itemFile)
    },
    fixdata(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    get_header_row(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
        var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    // 导出
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['sku', 'name', 'packageWeight', 'packageSize']
          const filterVal = ['sku', 'name', 'packageWeight', 'packageSize']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      } else {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['sku', 'name', 'packageWeight', 'packageSize']
          const filterVal = ['sku', 'name', 'packageWeight', 'packageSize']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style lang="scss">
.right {
  display: inline-block;
  padding-right: 20px;
  position: absolute;
  right: 0px;
}

#excel-upload-input {
  display: none;
  z-index: -9999;
}

.el-dialog__body {
  padding: 0px 20px;
}
</style>
