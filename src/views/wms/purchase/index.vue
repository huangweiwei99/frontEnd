<template>
  <div class="app-container calendar-list-container">
    <div class="base" v-if="baseVisible">
      <!-- 搜索容器 -->
      <div class="filter-container">

        <el-button class="filter-item" icon="el-icon-edit" @click="handleCreate">{{$t('table.add')}}</el-button>
        <span class="right">
          <el-button class="filter-item" icon="el-icon-search" @click="handleAdanceToggle">{{$t('table.advance')}}</el-button>
        </span>
        <div class="form-container" v-if="advanceVisable">
          <el-row :gutter="24">
            <el-form label-position="left" label-width="70px">
              <el-col :span="9">
                <el-form-item :label="$t('purchase.date')" prop="name">
                  <el-input v-model="listQuery.date" prefix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item :label="$t('purchase.purchasetransid')" prop="packageWeight">
                  <el-input v-model="listQuery.purchasetransid" prefix-icon="el-icon-remove-outline"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-radio-group v-model="listQuery.range">
                    <el-radio label="desc">倒序</el-radio>
                    <el-radio label="asc">顺序</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <el-row :gutter="24">
            <el-form label-position="left" label-width="70px">
              <el-col :span="12">
                <el-form-item :label="$t('table.sortFiled')" prop="packageWeight">
                  <el-select style="width: 140px" class="filter-item" v-model="listQuery.sort">
                    <el-option key="date" :label="$t('purchase.date')" value="date"></el-option>
                    <el-option key="purchasetransid" :label="$t('purchase.purchasetransid')" value="purchasetransid"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
            <el-col :span="6">
              <span style="display: inline-block;padding-right: 10px;position:absolute;right:0px;">
                <el-button type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
                <el-button type="danger" icon="el-icon-refresh" @click="handleAdvanceReset">{{$t('table.reset')}}</el-button>
              </span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-form label-position="left" label-width="70px">
              <el-col :span="12">
                <el-form-item :label="$t('table.exportFileName')" prop="packageWeight">
                  <el-input style='width:340px;' :placeholder="$t('excel.placeholder')" prefix-icon="el-icon-document" v-model="filename"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <el-col :span="6">
              <span style="display: inline-block;padding-right: 10px;position:absolute;right:0px;">
                <input id="excel-upload-input" type="file" accept=".xlsx, .xls" class="c-hide" @change="handkeFileChange">
                <el-button class="filter-item" icon="el-icon-upload2" @click="handleUpload">导入</el-button>
                <el-button class="filter-item" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading" v-waves>{{$t('table.export')}}</el-button>
              </span>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 数据表格 -->
      <el-table :key='tableKey' :data="list" v-loading="listLoading" :element-loading-text="$t('table.loadingText')" border fit highlight-current-row @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column width="200px" align="center" :label="$t('purchase.date')">
          <template slot-scope="scope">
            <span>{{scope.row.date | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="365px" align="center" :label="$t('purchase.purchasetransid')">
          <template slot-scope="scope">
            <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.purchasetransid}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.actions')" width="150" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('table.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页导航 -->
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 产品表单 -->
    <div class="productTable" v-if="!this.baseVisible">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{textMap[formStatus]}}</span>
          </div>
          <div>
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="80px">
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item :label="$t('purchase.purchasetransid')" prop="purchasetransid">
                    <el-input v-model="temp.purchasetransid" prefix-icon="el-icon-tickets"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('purchase.place')" prop="place">
                    <el-input v-model="temp.place" prefix-icon="el-icon-tickets"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('purchase.date')" prop="date">
                    <el-date-picker type="date" v-model="temp.date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item :label="$t('supplier.name')" prop="name">
                    <el-select v-model="temp.supplier" :placeholder="$t('purchase.optsupplier')" remote @change="getProductsList()">
                      <el-option v-for="item in suppliersopts" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-form :rules="rules" ref="dataForm" :model="form" label-position="top" label-width="80px" style='margin-left:50px;'>
              <el-row :gutter="20" style="margin-top:50px;">
                <el-col :span="6" v-for="(item,index) in form.products" :key="index">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <!--  -->
                      <el-popover placement="top-start" width="160" trigger="hover">
                        <div style="width:110">
                          <img :src="item.cover" :alt="item.sku" width="100">
                        </div>
                        <span slot="reference">{{item.sku}}</span>
                      </el-popover>
                    </div>
                    <div class="component-item">
                      <el-form-item prop="quantity">
                        <md-input icon="search" name="quantity" :placeholder="$t('purchase.quantity')" v-model="item.quantity">{{$t('purchase.quantity')}}</md-input>
                      </el-form-item>
                      <el-form-item prop="price">
                        <md-input icon="tickets" name="price" :placeholder="$t('purchase.price')" v-model="item.price">{{$t('purchase.price')}}</md-input>
                      </el-form-item>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

      </el-row>
      <span class="right" style="margin-top:10px;">
        <div slot="footer" class="dialog-footer">
          <el-button icon="el-icon-close" @click="handleReturnTable">{{$t('table.cancel')}}</el-button>
          <el-button v-if="formStatus=='create'" type="primary" @click="createData" icon="el-icon-check">{{$t('table.confirm')}}</el-button>
          <el-button v-else type="primary" @click="updateData" icon="el-icon-check">{{$t('table.confirm')}}</el-button>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { fetchList, createPurchase, updatePurchase, fetchSupplierList, fetchProductList, fetchPurchase } from '@/api/purchase'
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
      } else if (value.length !== 4) {
        return callback(new Error('交易号长度为4位'))
      } else if (!/^\d+$/.test(value)) {
        return callback(new Error('只能输入数字'))
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
        sort: 'purchasetransid',
        range: 'asc'
      },
      supplierQuery: {
        id: ''
      },
      temp: {
        id: undefined,
        date: new Date(),
        purchasetransid: '',
        supplier: '',
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
        purchasetransid: [{ required: true, validator: checkPurchaseTransId, trigger: 'blur' }]
      },
      downloadLoading: false,
      multipleSelection: [],
      filename: '',
      suppliersopts: [],
      form: {
        products: [{
          quantity: null,
          price: null
        }]
      }
    }
  },
  created() {
    this.getList()
    this.getSupplierList()
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
    getSupplierList() {
      this.listLoading = true
      fetchSupplierList().then(response => {
        this.suppliersopts = response.data.items
        this.listLoading = false
      })
      this.form.products = []
    },
    getProductsList() {
      console.log(this.temp.supplier)
      this.supplierQuery.id = this.temp.supplier
      fetchProductList(this.temp.supplier).then(response => {
        this.form.products = response.data.items
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 添加
    resetTemp() {
      this.temp = {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        name: '',
        sku: '',
        supplier: ''
      }
    },
    handleCreate() {
      this.baseVisible = false
      this.formStatus = 'create'
      this.resetTemp()
      this.form.products = null
      // this.formStatus = 'create'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          console.log(this.temp)
          this.temp.products = this.form.products
          createPurchase(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.baseVisible = true
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 编辑
    // handleUpdate(row) {
    //   this.fileList = row.images
    //   this.temp = Object.assign({}, row) // copy obj
    //   this.temp.timestamp = new Date(this.temp.timestamp)
    //   this.formStatus = 'update'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    handleUpdate(row) {
      this.baseVisible = false
      this.formStatus = 'update'
      fetchPurchase(row.purchasetransid).then(response => {
        this.temp.id = response.data.item.id
        this.temp.date = response.data.item.date
        this.temp.purchasetransid = response.data.item.purchasetransid
        this.temp.place = response.data.item.place
        this.temp.supplier = response.data.item.supplier
        this.form.products = response.data.item.products
      })
      //   temp: {
      //   id: undefined,
      //   date: new Date(),
      //   purchasetransid: '',
      //   supplier: '',
      //   place: ''
      // },
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updatePurchase(tempData).then(() => {
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
          })
        }
      })
    },
    cancelData() {
      this.dialogFormVisible = false
      this.fileList = []
    },
    // 删除
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
      this.listQuery.purchasetransid = null
      this.listQuery.date = null
      this.listQuery.range = 'asc'
      this.listQuery.sort = 'id'
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
    handkeFileChange(e) {
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
