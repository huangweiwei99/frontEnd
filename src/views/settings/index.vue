<template>
  <div class="app-container">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="120px"
    >
      <el-form-item
        :label="$t('settings.name')"
        prop="name"
        
      >
        <el-input v-model="form.name" prefix-icon="el-icon-third-xitongshezhi"></el-input>
      </el-form-item>
      <el-form-item :label="$t('settings.description')">
        <el-input
          type="textarea"
          v-model="form.description"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('settings.allowOrgin')"
        prop="urls"
      >
        <el-tag
          :key="tag"
          v-model="form.urls"
          v-for="tag in allowOrginTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="mini"
          @click="showInput"
        >{{$t('settings.addUrlTag')}}</el-button>

      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit('form')"
           icon="el-icon-check"
        >{{$t('table.confirm')}}</el-button>
        <el-button @click="onCancel"  icon="el-icon-refresh">{{$t('table.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchSettings, updateSettings } from '@/api/settings'
export default {
  data() {
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
    // var checkUrls = (rule, value, callback) => {
    //   console.log(0)
    //   if (!value) {
    //     return callback(new Error('SKU不能为空'))
    //   } else if (value.length !== 6) {
    //     return callback(new Error('SKU长度为6位'))
    //   } else if (!/^[A]{1}[0-9]{5}$/.test(value)) {
    //     return callback(new Error('SKU模式错误，格式：A00000'))
    //   } else {
    //     callback()
    //   }
    // }

    return {
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, validator: checkName, trigger: 'blur' }]
        // urls: [{ required: true, validator: checkUrls, trigger: 'blur' }]
      },
      // allowOrginTags: ['http://www.baidu.com', 'http://www.g.com', 'http://www.a.com'],
      allowOrginTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  created() {
    this.handleSettings()
  },
  methods: {
    handleSettings() {
      fetchSettings().then((response) => {
        this.form.name = response.data.name
        this.form.description = response.data.description
        this.allowOrginTags = response.data.allow_orgin
      })
    },
    onSubmit() {
      // this.$message('submit!')
      this.$refs['form'].validate((valid) => {
        // eslint-disable-next-line no-empty
        if (valid) {
          console.log('true')
          this.form.allowOrgin = this.allowOrginTags
          updateSettings(this.form).then((response) => {
            if (response.code === 200) {
              this.$notify({
                title: '成功',
                message: response.data,
                type: 'success',
                duration: 2000
              })
              this.handleSettings()
            }
          })
        } else {
          console.log('false')
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleClose(tag) {
      console.log(tag)
      this.allowOrginTags.splice(this.allowOrginTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue

      const condition = this.allowOrginTags.some((val, index, arra) => {
        return val === inputValue
      })
      const localhostUrl = /(http(s)?:\/\/)?localhost:(\d)*$/.test(inputValue)
      const commonUrl = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/.test(inputValue)
      // || (!/(http(s)?:\/\/)?localhost:(\d)*$/.test(inputValue))
      // if ((!/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/.test(inputValue))) {
      if (!(localhostUrl || commonUrl)) {
        this.$message({
          message: '请填写正确的URL!',
          type: 'warning'
        })
      } else if (condition) {
        this.$message({
          message: '重复URL!',
          type: 'warning'
        })
      } else {
        this.allowOrginTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
