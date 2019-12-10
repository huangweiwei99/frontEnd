<template>
  <div class="app-container calendar-list-container">
    <div
      class="base"
      v-if="baseVisible"
    >
      <!-- 搜索容器 -->
      <div class="filter-container">

        <!-- 高级搜索按钮 -->
        <div>
          <el-button
            class="filter-item"
            icon="el-icon-third-add"
            @click="handleCreate"
          >{{$t('table.add')}}</el-button>

          <el-button
            class="filter-item"
            icon="el-icon-third-query1"
            @click="handleAdanceToggle"
            style="float:right"
          >{{$t('table.advance')}}</el-button>

        </div>
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
                :span="6"
                :xs="24"
                :sm="12"
                :lg="8"
              >
                <el-form-item
                  :label="$t('purchase.date')"
                  prop="date"
                >
                  <el-input
                    v-model="listQuery.date"
                    prefix-icon="el-icon-third-riqi"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="6"
                :xs="24"
                :sm="12"
                :lg="8"
              >
                <el-form-item
                  :label="$t('purchase.purchasetransid')"
                  prop="purchasetransid"
                >
                  <el-input
                    v-model="listQuery.purchasetransid"
                    prefix-icon="el-icon-third-jiaoyisuo"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="6"
                :xs="24"
                :sm="12"
                :lg="8"
              >
                <el-form-item style="margin-bottom:50px">

                  <span>
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
                :lg="6"
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
                :lg="6"
              >
                <el-form-item style="margin-bottom:50px">
                  <input
                    id="excel-upload-input"
                    type="file"
                    accept=".xlsx, .xls"
                    class="c-hide"
                    @change="handleFileChange"
                  >
                  <el-button-group class="filter-containter-button-group">
                    <el-button
                      class="filter-item"
                      icon="el-icon-upload2"
                      @click="handleUpload"
                    >导入</el-button>
                    <el-button
                      class="filter-item"
                      icon="el-icon-download"
                      @click="handleDownload"
                      :loading="downloadLoading"
                      v-waves
                    >{{$t('table.export')}}</el-button>
                  </el-button-group>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>
      <!-- 数据表格 -->
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
          width="200px"
          align="center"
          :label="$t('purchase.date')"
          prop="date"
          sortable="custom"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <span>{{scope.row.date | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="365px"
          align="center"
          sortable="custom"
          prop="purchase_transaction_id"
          :label="$t('purchase.purchasetransid')"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <span
              class="link-type"
              @click="handleUpdate(scope.row)"
            >{{scope.row.purchasetransid}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          width="170"
          class-name="small-padding fixed-width"
          prop="action"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >{{$t('table.edit')}}</el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >{{$t('table.delete')}}
              </el-button>
            </el-button-group>
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
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 产品表单 -->
    <div
      class="Table"
      v-if="!this.baseVisible"
    >
      <el-row>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>{{$t(textMap[formStatus])}}</span>
          </div>
          <div>
            <el-form
              :rules="rules"
              ref="dataForm"
              :model="temp"
              label-position="right"
              label-width="80px"
            >
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item
                    :label="$t('purchase.purchasetransid')"
                    prop="purchasetransid"
                  >
                    <el-input
                      v-model="temp.purchasetransid"
                      prefix-icon="el-icon-third-jiaoyisuo"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('purchase.place')"
                    prop="place"
                  >
                    <el-input
                      v-model="temp.place"
                      prefix-icon="el-icon-third-souhuodizhi"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('purchase.date')"
                    prop="date"
                  >
                    <el-date-picker
                      type="date"
                      v-model="temp.date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <!-- <el-col :span="8">
                  <el-form-item :label="$t('supplier.name')" prop="name">
                    <el-select v-model="temp.supplier" :placeholder="$t('purchase.optsupplier')" remote @change="getProductsList()">
                      <el-option v-for="item in suppliersopts" :key="item.id" :label="item.name" :value=item.id >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col :span="8">
                  <el-form-item
                    :label="$t('supplier.name')"
                    prop="name"
                  >
                    <el-cascader
                      v-model="temp.supplier"
                      placeholder="选择供应商"
                      :options="cascaderSupplierOptions"
                      filterable
                      change-on-select
                      @change="getProductsList()"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-form
              :rules="rules"
              ref="productsForm"
              :model="form"
              label-position="top"
              label-width="80px"
              style='margin-left:50px;'
            >
              <el-row
                :gutter="20"
                style="margin-top:50px;"
              >
                <el-col
                  :span="6"
                  v-for="(item,index) in form.products"
                  :key="index"
                >
                  <el-card class="box-card">
                    <div
                      slot="header"
                      class="clearfix"
                    >
                      <!--  -->
                      <el-popover
                        placement="top-start"
                        width="160"
                        trigger="hover"
                      >
                        <div style="width:110">
                          <img
                            :src="item.cover"
                            :alt="item.sku"
                            width="100"
                          >
                        </div>
                        <span slot="reference">{{item.sku}}</span>
                      </el-popover>
                    </div>
                    <div class="component-item">
                      <el-form-item prop="quantity">
                        <md-input
                          icon="check"
                          name="quantity"
                          :placeholder="$t('purchase.quantity')"
                          v-model="item.quantity"
                        >{{$t('purchase.quantity')}}</md-input>
                      </el-form-item>
                      <el-form-item prop="cost">
                        <md-input
                          icon="tickets"
                          name="cost"
                          :placeholder="$t('purchase.cost')"
                          v-model="item.cost"
                        >{{$t('purchase.cost')}}</md-input>
                      </el-form-item>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

      </el-row>
      <span
        class="right"
        style="margin-top:10px;"
      >
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            icon="el-icon-close"
            @click="handleReturnTable"
          >{{$t('table.cancel')}}</el-button>
          <el-button
            v-if="formStatus=='create'"
            type="primary"
            @click="createData"
            icon="el-icon-check"
          >{{$t('table.confirm')}}</el-button>
          <el-button
            v-else
            type="primary"
            @click="updateData"
            icon="el-icon-check"
          >{{$t('table.confirm')}}</el-button>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { fetchList, createPurchase, updatePurchase, deletePurchase, fetchProductList, fetchPurchase, fetchSupplierList } from '@/api/purchase'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import XLSX from 'xlsx'
import MdInput from '@/components/MDinput'

export default {
  name: 'purchaseTable',
  directives: {
    waves
  },
  components: {
    MdInput
  },
  data() {
    var checkPurchaseTransId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('交易号不能为空'))
      } else if (value.length !== 14) {
        return callback(new Error('交易号长度为14位'))
        // } else if (!/^\d+$/.test(value)) {
      } else if (!/^[PT]{2}[0-9]{12}$/.test(value)) {
        return callback(new Error('只能输入数字'))
      } else {
        callback()
      }
    }
    var checkPlace = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('采购地点不能为空'))
      } else {
        callback()
      }
    }
    var checkDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('采购日期不能为空'))
      } else {
        callback()
      }
    }

    return {
      tableKey: 0,
      activeName: 'first',
      dialogImageUrl: '',
      dialogVisible: false,
      baseVisible: true,
      fileList: [],
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        purchasetransid: undefined,
        sort: 'id',
        order: 'desc'
      },
      supplierQuery: {
        id: ''
      },
      temp: {
        id: undefined,
        date: new Date(),
        purchasetransid: '',
        purchase_transaction_id: '',
        supplier: [],
        place: '',
        products: []
      },
      formStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      advanceVisable: false,
      rules: {
        purchasetransid: [{ required: true, validator: checkPurchaseTransId, trigger: 'blur' }],
        place: [{ required: true, validator: checkPlace, trigger: 'blur' }],
        date: [{ required: true, validator: checkDate, trigger: 'blur' }]
      },
      downloadLoading: false,
      multipleSelection: [],
      filename: '',
      // suppliersopts: [],
      cascaderSupplierOptions: [],
      form: {
        products: []
      }
    }
  },
  created() {
    this.getList()
    // this.getSupplierList()
  },
  methods: {
    // 数据列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
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
          icon = 'el-icon-third-cuxiaohuodong-SKUdazhe'
          break
        case 'purchase_transaction_id':
          icon = 'el-icon-third-product1'
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
    getSupplierList() {
      fetchSupplierList({}).then((response) => {
        const options = []
        response.data.items.forEach((response) => {
          const children = []
          response.products.forEach((product) => {
            children.push({ value: product.id, label: product.sku })
          })
          options.push({ value: response.id, label: response.name, children: children })
        })
        options.unshift({ value: 0, label: '所有' })
        this.cascaderSupplierOptions = options
        this.listLoading = false
      })
    },
    getProductsList() {
      console.log(this.temp.supplier)
      var data = { purchase_id: this.temp.id, supplier_id: this.temp.supplier[0], product_id: this.temp.supplier[1] }
      fetchProductList(data).then(response => {
        if (response.code === 200) {
          this.form.products = response.data.items
          this.listLoading = false
        }
      })
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
        date: new Date(),
        purchasetransid: '',
        purchase_transaction_id: '',
        supplier: [],

        place: '',
        products: []
      }
    },
    // 处理创建表单
    handleCreate() {
      this.baseVisible = false
      this.formStatus = 'create'
      this.resetTemp()
      this.form.products = null
      this.getSupplierList()
    },
    // 创建数据
    createData() {
      // console.log(this.form.products)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.form.products.forEach((item) => {
            if (typeof item.quantity !== 'undefined' && typeof item.cost !== 'undefined') {
              this.temp.products.unshift({ quantity: item.quantity, cost: item.cost, product_id: item.id, supplier_id: item.supplier_id })
            }
          })
          this.temp.purchase_transaction_id = this.temp.purchasetransid
          this.temp.date = Date.parse(new Date(this.temp.date)).toString().substr(0, 10)
          createPurchase(this.temp).then((response) => {
            if (response.code === 200) {
              this.getList()
              this.baseVisible = true
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },

    // 处理更新表单
    handleUpdate(row) {
      console.log(row)
      this.resetTemp()
      this.baseVisible = false
      this.formStatus = 'update'
      this.listLoading = true
      this.getSupplierList()
      fetchPurchase(row).then(response => {
        this.temp.id = response.data.id
        this.temp.date = response.data.date
        this.temp.purchasetransid = response.data.purchase_transaction_id
        this.temp.place = response.data.place
        this.form.products = response.data.products
      })
    },
    // 更新数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.purchase_transaction_id = this.temp.purchasetransid
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          tempData.contents = this.form.products
          // tempData.products = this.form.products
          console.log(tempData)
          updatePurchase(tempData).then((response) => {
            if (response.code === 200) {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.baseVisible = true
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    // 取消数据
    cancelData() {
      this.dialogFormVisible = false
      this.fileList = []
    },
    // 处理删除数据
    handleDelete(row) {
      deletePurchase(row).then((response) => {
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        }
      })
    },
    // 处理高级面板
    handleAdanceToggle() {
      this.advanceVisable = !this.advanceVisable
    },
    // 处理重置高级表单
    handleAdvanceReset() {
      this.listQuery.page = 1
      this.listQuery.purchasetransid = null
      this.listQuery.date = null
      this.listQuery.order = 'asc'
      this.listQuery.sort = 'purchase_transaction_id'
      this.getList()
    },
    handleReturnTable() {
      this.baseVisible = true
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
          const tHeader = ['sku', 'purchasetransid']
          const filterVal = ['sku', 'purchasetransid']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      } else {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['date', 'purchasetransid']
          const filterVal = ['date', 'purchasetransid']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'date') {
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
// .form-container {
//   padding-top: 5px;
//   border: 1px solid gray
// }
.box-card {
  margin: 5px 0px;
}
</style>
