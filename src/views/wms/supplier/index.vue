<template>
  <div class="app-container calendar-list-container">
      <div class="filter-container">
        <el-button class="filter-item" icon="el-icon-edit" @click="handleCreate">{{$t('table.add')}}</el-button>
        <span class="right">
          <el-button class="filter-item" icon="el-icon-search" @click="handleAdanceToggle">{{$t('table.advance')}}</el-button>
        </span>
        <div class="form-container" v-if="advanceVisable">
            <el-row :gutter="24">
              <el-form label-position="left" label-width="70px">
              <el-col :span="6"> 
                  <el-form-item :label="$t('supplier.name')" prop="name">
                      <el-input v-model="listQuery.name" prefix-icon="el-icon-edit"></el-input>
                   </el-form-item>
              </el-col>
              <el-col :span="6"> 
                  <el-form-item :label="$t('supplier.platform')" prop="name">
                      <el-input v-model="listQuery.platform" prefix-icon="el-icon-edit"></el-input>
                   </el-form-item>
              </el-col>
              <el-col :span="6"> 
                <el-form-item :label="$t('supplier.address')" prop="name">
                      <el-input v-model="listQuery.address" prefix-icon="el-icon-edit"></el-input>
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
               <el-col :span="12"> 
                  <el-form label-position="left" label-width="70px">
                    <el-form-item :label="$t('table.sortFiled')" prop="sortFiled">
                        <el-select style="width: 140px" class="filter-item" v-model="listQuery.sort">          
                            <el-option key="name" :label="$t('supplier.name')" value="name"></el-option>
                            <el-option key="platform" :label="$t('supplier.platform')" value="platform"></el-option>
                            <el-option key="address" :label="$t('supplier.address')" value="address"></el-option>
                        </el-select>
                      </el-form-item>
                  </el-form>
                </el-col>
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
                  <input id="excel-upload-input" type="file" accept=".xlsx, .xls" class="c-hide" @change="handkeFileChange"> 
                  <el-button class="filter-item" icon="el-icon-upload2" @click="handleUpload">导入</el-button>
                  <el-button class="filter-item" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading" v-waves >{{$t('table.export')}}</el-button>
                </span>
              </el-col>
          </el-row>
        </div>
      </div>
      <el-table :key='tableKey' :data="list" v-loading="listLoading" :element-loading-text="$t('table.loadingText')" border fit highlight-current-row
     @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column min-width="200" align="center" :label="$t('supplier.name')">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" :label="$t('supplier.platform')">
        <template slot-scope="scope">
          <span>{{scope.row.platform}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('supplier.address')" min-width="365px">
         <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
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
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      </div>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="cancelData">
      <template>
         <el-form  :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
              <el-form-item :label="$t('supplier.name')" prop="name">
                <el-input v-model="temp.name" prefix-icon="el-icon-edit"></el-input>
              </el-form-item>
              <el-form-item :label="$t('supplier.platform')" prop="platform">
                <el-input v-model="temp.platform" prefix-icon="el-icon-tickets"></el-input>
              </el-form-item>
              <el-form-item :label="$t('supplier.address')" prop="address">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.address">
                </el-input>
              </el-form-item>
            </el-form>        
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelData" icon="el-icon-close">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" icon="el-icon-check">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData" icon="el-icon-check">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

</div>
</template>
<<script>
import { fetchList, createSupplier, updateSupplier } from '@/api/supplier'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import XLSX from 'xlsx'

export default {
  name: 'supplierTable',
  directives: {
    waves
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('供应商不能为空'))
      } else if (value.length < 2) {
        return callback(new Error('供应商至少两个字符'))
      } else {
        callback()
      }
    }
    var checkAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('地址不能为空'))
      } else if (value.length < 2) {
        return callback(new Error('地址至少两个字符'))
      } else {
        callback()
      }
    }
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        sort: 'name',
        range: 'asc'
      },
      temp: {
        id: undefined,
        name: '',
        platform: '',
        address: ''
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
        address: [{ required: true, validator: checkAddress, trigger: 'blur' }]
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
        platform: '',
        address: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createSupplier(this.temp).then(() => {
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
    // 编辑
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
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateSupplier(tempData).then(() => {
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
    // 高级面板
    handleAdanceToggle() {
      this.advanceVisable = !this.advanceVisable
    },
    handleAdvanceReset() {
      this.listQuery.page = 1
      this.listQuery.address = null
      this.listQuery.name = null
      this.listQuery.platform = null
      this.listQuery.range = 'asc'
      this.listQuery.sort = 'name'
      this.getList()
    },
    // 导出
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['name', 'platform', 'address']
          const filterVal = ['name', 'platform', 'address']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      } else {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['name', 'platform', 'address']
          const filterVal = ['name', 'platform', 'address']
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
.right
{
display: inline-block;
padding-right: 20px;
position:absolute;
right:0px;
}

#excel-upload-input{
  display: none;
  z-index: -9999;
}
</style>


