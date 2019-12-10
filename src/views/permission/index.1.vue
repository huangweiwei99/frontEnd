<template>
  <div class="app-container">
    <div style="margin-bottom:15px;">{{$t('permission.roles')}}： {{roles}}</div>
    {{$t('permission.switchRoles')}}：
    <el-radio-group v-model="role">
      <el-radio-button label="editor"></el-radio-button>
    </el-radio-group>
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="1"
      >
        <div class="grid-content bg-purple">1</div>
      </el-col>
      <el-col
        :xs="24"
        :sm="6"
        :md="8"
        :lg="9"
        :xl="11"
      >
        <div class="grid-content bg-purple-light">2</div>
      </el-col>
      <el-col
        :xs="24"
        :sm="6"
        :md="8"
        :lg="9"
        :xl="11"
      >
        <div class="grid-content bg-purple">3</div>
      </el-col>
      <el-col
        :xs="24"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="1"
      >
        <div class="grid-content bg-purple-light">4</div>
      </el-col>
    </el-row>
    <el-row :gutter="6">
      <el-col
        :xs="24"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="1"
      >
      </el-col>
      <el-col
        :xs="24"
        :sm="6"
        :md="8"
        :lg="9"
        :xl="11"
      >
        <div class="grid-content bg-purple-light">2</div>
      </el-col>
      <el-col
        :xs="24"
        :sm="6"
        :md="8"
        :lg="9"
        :xl="11"
      >
        <div class="grid-content bg-purple">3</div>
      </el-col>
      <el-col
        :xs="24"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="1"
      >
        <div class="grid-content bg-purple-light">4</div>
      </el-col>
    </el-row>
    <el-row>
      <div class="grid-content bg-purple">

        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <el-form
              ref="productsForm"
              label-position="top"
              label-width="80px"
              style='margin-left:50px;'
            >
              <el-row
                :gutter="20"
                style="margin-top:50px;"
              >
                <el-col :span="6">
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
                            src=""
                            alt=""
                            width="100"
                          >
                        </div>
                        <span slot="reference">
                          角色名称
                        </span>
                      </el-popover>
                    </div>
                    <div class="component-item">
                      <el-form-item prop="quantity">
                        <md-input
                          icon="check"
                          name="quantity"
                          placeholder=""
                        ></md-input>
                      </el-form-item>
                      <el-form-item prop="cost">
                        <md-input
                          icon="tickets"
                          name="cost"
                          placeholder=""
                        ></md-input>
                      </el-form-item>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </div>
    </el-row>

    <el-row>
      <el-col
        :span="8"
        v-for="(o, index) in 2"
        :key="o"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon
              icon-class="peoples"
              class-name="card-panel-icon"
            />
          </div>
          <div style="padding: 14px;">
            <span>用户角色</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button
                type="text"
                class="button"
              >操作</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      class="panel-group"
      :gutter="40"
    >
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <div class='card-panel'>
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon
              icon-class="peoples"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">系统管理员</div>
            <el-button
              type="text"
              class="button"
            >操作</el-button>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper el-icon-third-yonghu1">
            <svg-icon
              icon-class="message"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">普通用户</div>

          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper el-icon-third-caiwuguanli">
            <svg-icon
              icon-class="money"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">财务管理员</div>

          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper el-icon-third-cangku_cangneishicao">
            <svg-icon
              icon-class="shoppingCard"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">仓库管理员</div>

          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import MdInput from '@/components/MDinput'

export default {
  name: 'permission',
  components: {
    MdInput
  },
  data() {
    return {
      role: '',
      currentDate: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  watch: {
    role(val) {
      this.$store.dispatch('ChangeRole', val).then(() => {
        this.$router.push({ path: '/permission/index?' + +new Date() })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
