<template>
  <div class="app-container calendar-list-container">
    <!-- 过滤器 -->
    <div class="filter-container">
      <el-button class="filter-item" icon="el-icon-edit" @click="handleCreate">{{$t('table.add')}}</el-button>
      <span class="right">
        <el-button class="filter-item" icon="el-icon-search" @click="handleAdanceToggle">{{$t('table.advance')}}</el-button>
      </span>
      <div class="form-container" v-if="advanceVisable">
        <el-row :gutter="24">
          <el-form label-position="left" label-width="70px">
            <el-col :span="6">
              <el-form-item :label="$t('product.name')" prop="name">
                <el-input v-model="listQuery.name" prefix-icon="el-icon-edit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('product.sku')" prop="sku">
                <el-input v-model="listQuery.sku" prefix-icon="el-icon-tickets"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('product.packageWeight')" prop="packageWeight">
                <el-input v-model="listQuery.packageWeight" prefix-icon="el-icon-remove-outline"></el-input>
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
                  <el-option key="name" :label="$t('product.name')" value="name"></el-option>
                  <el-option key="sku" :label="$t('product.sku')" value="sku"></el-option>
                  <el-option key="packageWeight" :label="$t('product.packageWeight')" value="packageWeight"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">

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
            <el-col :span="6">

            </el-col>
          </el-form>
          <el-col :span="6">
            <span style="display: inline-block;padding-right: 10px;position:absolute;right:0px;">
              <input id="excel-upload-input" type="file" accept=".xlsx, .xls" class="c-hide" @change="handleFileChange">
              <el-button class="filter-item" icon="el-icon-upload2" @click="handleUpload">导入</el-button>
              <el-button class="filter-item" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading" v-waves>{{$t('table.export')}}</el-button>
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" :element-loading-text="$t('table.loadingText')" border fit highlight-current-row @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column width="110px" align="center" :label="$t('product.sku')">
        <template slot-scope="scope">
          <span>{{scope.row.sku}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="365px" align="center" :label="$t('product.name')">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="$t('product.packageWeight')">
        <template slot-scope="scope">
          <span>{{scope.row.packageWeight}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('product.packageSize')" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.packageSize}}</span>
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
    <!-- 编辑对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="cancelData">
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="产品信息" name="first">
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
              <el-form-item :label="$t('table.title')" prop="name">
                <el-input v-model="temp.name" prefix-icon="el-icon-edit"></el-input>
              </el-form-item>
              <el-form-item :label="$t('product.sku')" prop="sku">
                <el-input v-model="temp.sku" prefix-icon="el-icon-tickets"></el-input>
              </el-form-item>
              <el-form-item :label="$t('product.packageWeight')" prop="packageWeight">
                <el-input v-model="temp.packageWeight" prefix-icon="el-icon-remove-outline"></el-input>
              </el-form-item>
              <el-form-item :label="$t('product.packageSize')" prop="packageSize">
                <el-input v-model="temp.packageSize" prefix-icon="el-icon-message"></el-input>
              </el-form-item>
              <el-form-item :label="$t('product.remark')">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark">
                </el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="产品图片" name="second">
            <el-upload ref="upload" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelData" icon="el-icon-close">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" icon="el-icon-check">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData" icon="el-icon-check">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createProduct, updateProduct } from '@/api/product'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import XLSX from 'xlsx'

export default {
  name: 'productTable',
  directives: {
    waves
  },
  data() {
    var checkSku = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('SKU不能为空'))
      } else if (value.length !== 6) {
        return callback(new Error('SKU长度为6位'))
      } else if (!/^[A]{1}[0-9]{5}$/.test(value)) {
        return callback(new Error('SKU模式错误，格式：A00000'))
      } else {
        callback()
      }
    }
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('产品名称不能为空'))
      } else if (value.length < 2) {
        return callback(new Error('产品名称至少两个字符'))
      } else if (value.length > 100) {
        return callback(new Error('产品名称最多100个字符'))
      } else {
        callback()
      }
    }
    var checkPackageWeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('包装重量不能为空'))
      } else if (!/^\d+$/.test(value)) {
        return callback(new Error('包装重量为整数'))
      } else {
        callback()
      }
    }
    var checkPackageSize = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('包装尺寸不能为空'))
      } else if (!/^[\d+]{1,4}[*][\d+]{1,4}[*][\d+]{1,4}$/.test(value)) {
        return callback(new Error('包装尺寸错误，请输入1111*2222*3333'))
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
        name: undefined,
        sort: 'sku',
        range: 'asc'
      },
      temp: {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        name: '',
        sku: '',
        packageWeight: '',
        packgeSize: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      advanceVisable: false,
      rules: {
        name: [{ required: true, validator: checkName, trigger: 'blur' }],
        sku: [{ required: true, validator: checkSku, trigger: 'blur' }],
        packageWeight: [{ required: true, validator: checkPackageWeight, trigger: 'blur' }],
        packageSize: [{ required: true, validator: checkPackageSize, trigger: 'blur' }]
      },
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
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
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
    // 处理创建表单
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 创建数据
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createProduct(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
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
    // 处理更新表单
    handleUpdate(row) {
      this.fileList = row.images
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 更新数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateProduct(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
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
    // 取消数据
    cancelData() {
      this.dialogFormVisible = false
      this.fileList = []
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
    // 处理高级面板
    handleAdanceToggle() {
      this.advanceVisable = !this.advanceVisable
    },
    // 处理重置高级表单
    handleAdvanceReset() {
      this.listQuery.page = 1
      this.listQuery.sku = null
      this.listQuery.name = null
      this.listQuery.packageWeight = null
      this.listQuery.range = 'asc'
      this.listQuery.sort = 'id'
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
