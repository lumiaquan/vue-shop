<template>
  <div class="Users">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="2" class="btn">
          <el-button type="primary" @click="diaVisible = true">添加</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column fixed type="index" label="#"></el-table-column>
        <el-table-column fixed prop="username" label="姓名"> </el-table-column>
        <el-table-column fixed prop="email" label="邮箱"> </el-table-column>
        <el-table-column fixed prop="mobile" label="电话"> </el-table-column>
        <el-table-column fixed prop="role_name" label="角色"> </el-table-column>
        <el-table-column fixed label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editUser(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.id)"
            ></el-button>
            <el-tooltip content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini "
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="添加用户"
      :visible.sync="diaVisible"
      @close="addDialogClosed"
      width="30%"
    >
      <el-form :model="addUserForm" :rules="rules" ref="addUser">
        <el-form-item label="用户名" prop="username">
          <el-input
            clearable
            v-model="addUserForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="addUserForm.password"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="text"
            v-model="addUserForm.email"
            placeholder="请输入邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            type="text"
            v-model="addUserForm.mobile"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="diaVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑个人信息"
      :visible.sync="eaditDialogVisible"
      width="30%"
      @close="editClose"
    >
      <el-form :model="editUserForm" :rules="rules" ref="editUser">
        <el-form-item label="用户名" prop="username">
          <el-input
            disabled
            v-model="editUserForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="text"
            v-model="editUserForm.email"
            placeholder="请输入邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            type="text"
            v-model="editUserForm.mobile"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eaditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editUserForm: {},
      tableData: [],
      queryInfo: { query: '', pagenum: 1, pagesize: 5 },
      total: 0,
      diaVisible: false,
      eaditDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名在3到10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '请输入6到15位密码', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      let _this = this
      this.axios({
        methods: 'GET',
        url: 'users',
        params: _this.queryInfo
      }).then(res => {
        if (res.data.meta.status !== 200) {
          _this.$message.error(res.data.meta.msg)
        }
        this.tableData = res.data.data.users
        this.total = res.data.data.total
      })
    },
    // 监听pagesize改变
    handleSizeChange(newPageSize) {
      this.queryInfo.pagesize = newPageSize
      this.getUserList()
    },
    // 监听页码变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async userStateChange(userInfo) {
      const { data: res } = await this.axios.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        this.$message.error('修改状态失败')
      } else {
        this.$message.success('修改状态成功')
      }
    },
    addDialogClosed() {
      this.$refs.addUser.resetFields()
    },
    handleAddUser() {
      let _this = this
      this.$refs.addUser.validate(async valid => {
        if (valid) {
          const res = await _this.axios.post('users', _this.addUserForm)
          let data = res.data
          if (data.meta.status === 201) {
            _this.$message.success(data.meta.msg)
            _this.diaVisible = false
          } else {
            _this.$message.error(data.meta.msg)
            _this.diaVisible = false
          }
        }
      })
    },
    editUser(id) {
      this.eaditDialogVisible = true
      this.axios.get('users/' + id).then(res => {
        this.editUserForm = res.data.data
      })
    },
    editClose() {
      this.$refs.editUser.resetFields()
    },
    handleEditUser() {
      let _this = this
      this.$refs.editUser.validate(async valid => {
        if (valid) {
          const { data: res } = await _this.axios.put(
            'users/' + _this.editUserForm.id,
            {
              email: _this.editUserForm.email,
              mobile: _this.editUserForm.mobile
            }
          )
          if (res.meta.status === 200) {
            _this.$message.success(res.meta.msg)
            _this.eaditDialogVisible = false
            _this.getUserList()
          } else {
            _this.$message.error(res.meta.msg)
            _this.eaditDialogVisible = false
          }
        }
      })
    },
    async deleteUser(id) {
      const res = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
      .catch((res) => res)
      if(res !== 'confirm'){
        return this.$message.info('已取消删除')
      }else{
        this.axios.delete('users/'+id)
        .then(res => {
          if(res.data.meta.status === 200){
            this.$message.success("删除成功")
            this.getUserList()
          }
        })
        .catch(err => {
          this.$message.success("err")
        })
      }
    }
  }
}
</script>

<style lang="scss">
.Users {
  .el-breadcrumb {
    margin-bottom: 15px;
  }
  .el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  }
  .box-card {
    .btn {
      .el-button {
        width: 100%;
      }
    }
    .el-table__header tr,
    .el-table__header th {
      padding: 0;
      height: 40px;
    }
    .el-table__body tr,
    .el-table__body td {
      padding: 0;
      height: 40px;
    }
  }
}
</style>
