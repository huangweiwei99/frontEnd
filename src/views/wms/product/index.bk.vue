<template>
  <div class="app-container calendar-list-container">
    <!-- 过滤器 -->
    <div class="filter-container">
      <el-button
      style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
        class="filter-item"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{$t('table.add')}}</el-button>
      <span class="right">
        <el-button style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
          class="filter-item"
          icon="el-icon-search"
          @click="handleAdanceToggle"
        >{{$t('table.advance')}}</el-button>
      </span>
      <div style="padding:10px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
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
              :lg="6"
            >
              <el-form-item
                :label="$t('product.name')"
                prop="name"
              >
                <el-input
                  v-model="listQuery.name"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              :xs="24"
              :sm="12"
              :lg="6"
            >
              <el-form-item
                :label="$t('product.sku')"
                prop="sku"
              >
                <el-input
                  v-model="listQuery.sku"
                  prefix-icon="el-icon-tickets"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              :xs="24"
              :sm="12"
              :lg="6"
            >
              <el-form-item
                :label="$t('product.weight')"
                prop="weight"
                
              >
                <el-input
                  v-model="listQuery.weight"
                  prefix-icon="el-icon-remove-outline"
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
                <span style="display:inline-block;position: absolute;right: 0px;">
                  <el-button style="border-radius: 0px"
                    plain
                    
                    icon="el-icon-search"
                    @click="handleFilter"
                  >{{$t('table.search')}}</el-button>
                  <el-button
                    plain
                   
                    icon="el-icon-refresh"
                    @click="handleAdvanceReset"
                  >{{$t('table.reset')}}</el-button>
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
            <!-- <el-col
            :span="6"
            :xs="24"
            :sm="12"
            :lg="6"
          >
          <span></span>
            </el-col>
            <el-col
            :span="6"
            :xs="24"
            :sm="12"
            :lg="6"
          > <span></span>
            </el-col> -->
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
              <span style="display:inline-block;position: absolute;right: 0px;">
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
      @selection-change="handleSelectionChange"
      @sort-change="handleSort"
      style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
    >
      <el-table-column
        type="selection"
        align="center"
        prop="id"
      ></el-table-column>
      <el-table-column
        width="110px"
        align="center"
        sortable="custom"
        prop="sku"
        :label="$t('product.sku')"
      >
        <template slot-scope="scope">
          <span>{{scope.row.sku}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="365px"
        align="center"
        :label="$t('product.name')"
        sortable="custom"
        prop="name"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="handleUpdate(scope.row)"
          >{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        :label="$t('product.weight')"
        sortable="custom"
        prop="weight"
      >
        <template slot-scope="scope">
          <span>{{scope.row.weight}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('product.dimension')"
        width="95"
      >
        <template slot-scope="scope">
          <span>{{scope.row.dimension}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="150"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
          >{{$t('table.edit')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >{{$t('table.delete')}}
          </el-button>
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
    <!-- 编辑对话框 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :before-close="cancelData"
    >
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane
            label="产品信息"
            name="first"
          >
            <el-form
              :rules="rules"
              ref="dataForm"
              :model="temp"
              label-position="left"
              label-width="80px"
              style='width: 400px; margin-left:50px;'
            >
              <el-form-item
                :label="$t('supplier.name')"
                prop="supplier"
              >
                <el-select
                  v-model="temp.supplier"
                  :placeholder="$t('purchase.optsupplier')"
                >
                  <el-option
                    v-for="item in suppliersopts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('table.title')"
                prop="name"
              >
                <el-input
                  v-model="temp.name"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('product.sku')"
                prop="sku"
              >
                <el-input
                  v-model="temp.sku"
                  prefix-icon="el-icon-tickets"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('product.weight')"
                prop="weight"
              >
                <el-input
                  v-model="temp.weight"
                  prefix-icon="el-icon-remove-outline"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('product.dimension')"
                prop="dimension"
              >
                <el-input
                  v-model="temp.dimension"
                  prefix-icon="el-icon-message"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item :label="$t('product.remark')">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="temp.remark"
                >
                </el-input>
              </el-form-item> -->
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label="产品图片"
            name="second"
          >
            <el-upload
              ref="upload"
              :action="picturePostUrl"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="onChange"
              :file-list="fileList"
              :auto-upload=false
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog
              :visible.sync="dialogVisible"
              append-to-body
            >
              <img
                width="100%"
                :src="dialogImageUrl"
                alt=""
              >
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </template>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="cancelData"
          icon="el-icon-close"
        >{{$t('table.cancel')}}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
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
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, getProduct, createProduct, updateProduct, fetchSupplierList, deleteProduct, deleteProductImagebyImageId, saveImageByProductId } from '@/api/product'
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
      } else if (!/^[A]{1}[0-9]{5}$/.handleSort(value)) {
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
    var checkSupplier = (rule, value, callback) => {
      if (typeof value !== 'number') {
        return callback(new Error('请选择正确的供应商'))
      } else {
        callback()
      }
    }
    var checkWeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('包装重量不能为空'))
      } else if (!/^\d+$/.handleSort(value)) {
        return callback(new Error('包装重量为整数'))
      } else {
        callback()
      }
    }
    var checkDimension = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('包装尺寸不能为空'))
      } else if (!/^[\d+]{1,4}[*][\d+]{1,4}[*][\d+]{1,4}$/.handleSort(value)) {
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
        order: 'desc'
      },
      temp: {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        name: '',
        sku: '',
        weight: '',
        dimension: '',
        supplier: '',
        images: []
      },
      picturePostUrl: '',
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      advanceVisable: false,
      rules: {
        name: [{ required: true, validator: checkName, trigger: 'blur' }],
        supplier: [{ required: true, validator: checkSupplier, trigger: 'blur' }],
        sku: [{ required: true, validator: checkSku, trigger: 'blur' }],
        weight: [{ required: true, validator: checkWeight, trigger: 'blur' }],
        dimension: [{ required: true, validator: checkDimension, trigger: 'blur' }]
      },
      suppliersopts: [],
      downloadLoading: false,
      multipleSelection: [],
      filename: ''
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    // 数据列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        if (response.code === 200) {
          fetchSupplierList().then(response => {
            this.suppliersopts = response.data.items
            this.listLoading = false
          })
        }
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
    // 远程排序
    handleSort(val) {
      // console.log(val)
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
        weight: '',
        dimension: '',
        supplier: ''
      }
    },
    // 处理创建表单
    handleCreate() {
      this.resetTemp()
      this.picturePostUrl = ''
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 创建数据
    createData() {
      const formData = new FormData()
      this.fileList.forEach((file) => {
        formData.append('images[]', file.raw)
      })
      formData.append('name', this.temp.name)
      formData.append('sku', this.temp.sku)
      formData.append('weight', this.temp.weight)
      formData.append('dimension', this.temp.dimension)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createProduct(formData).then((response) => {
            this.$refs.upload
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            var title = ''
            var message = ''
            var type = ''
            switch (response.code) {
              case 200:
                title = '成功'; message = response.data; type = 'success'
                break
              case 400:
                title = '危险'; message = response.data; type = 'danger'
                break
              default:
                title = '警告'; message = response.data; type = 'warn'
                break
            }
            this.$notify({
              title: title,
              message: message,
              type: type,
              duration: 2000
            })
          })
        }
      })
    },
    // 处理更新表单
    handleUpdate(row) {
      this.picturePostUrl = '#'
      getProduct(row).then((response) => {
        this.temp = Object.assign({}, response.data)
        // this.temp.supplier = response.data.supplier_id
        this.fileList = response.data.images
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      // console.log(this.fileList.length)
    },
    // 更新数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // 更新表单
          updateProduct(tempData).then((response) => {
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
              message: response.data,
              type: 'success',
              duration: 2000
            })
            // 更新图片
            if (response.code === 200) {
              const formData = new FormData()
              this.fileList.forEach((file) => {
                if (typeof file.raw !== 'undefined') {
                  formData.append('images[]', file.raw)
                }
              })
              if (formData.get('images[]')) {
                formData.append('id', this.temp.id)
                saveImageByProductId(formData).then((response) => {
                  this.$notify({
                    title: '成功',
                    message: response.data,
                    type: 'success',
                    duration: 2000
                  })
                })
              }
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
      deleteProduct(row).then((response) => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      })
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
      this.listQuery.weight = null
      this.listQuery.order = 'asc'
      this.listQuery.sort = 'sku'
      this.getList()
    },
    handleRemove(file, fileList) {
      const params = { id: this.temp.id, imageid: file.id }
      deleteProductImagebyImageId(params).then((response) => {
        this.$notify({
          title: '成功',
          message: response.data,
          type: 'success',
          duration: 2000
        })
      })
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    handlePictureCardPreview(file) {
      console.log(file.url)
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
          const tHeader = ['sku', 'name', 'weight', 'dimension']
          const filterVal = ['sku', 'name', 'weight', 'dimension']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      } else {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['sku', 'name', 'weight', 'dimension']
          const filterVal = ['sku', 'name', 'weight', 'dimension']
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
button,input
{
  border-radius: 0px !important
}
#excel-upload-input {
  display: none;
  z-index: -9999;
}

.el-dialog__body {
  padding: 0px 20px;
}
</style>
