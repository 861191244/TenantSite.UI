<template>
  <section>
    <el-drawer
      :title="title"
      :size="size"
      :append-to-body="true"
      :visible.sync="drawerVisible"
      :direction="direction"
      :wrapperClosable="wrapperClosable"
      class="drawer"
      @close="onClosePanl"
    >
      <section class="drawer-body">
        <!-- el-form 是修改的内容 其他复制到表单组件原则上不做修改 -->
        <el-form
          ref="refForm"
          :model="dataItem"
          label-width="80px"
          :inline="false"
          size="small"
          :rules="formRules"
        >
          <el-form-item label="编码" prop="code">
            <el-input v-model="dataItem.code" autocomplete="off" />
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="dataItem.title" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="dataItem.description" type="textarea" rows="2" />
          </el-form-item>

          <el-divider content-position="left"></el-divider>

          <el-form-item label="扩展1" prop="ex1">
            <el-input v-model="dataItem.ex1" />
          </el-form-item>
          <el-form-item label="扩展2" prop="ex2">
            <el-input v-model="dataItem.ex2" />
          </el-form-item>
          <el-form-item label="扩展3" prop="ex3">
            <el-input v-model="dataItem.ex3" />
          </el-form-item>
          <el-form-item label="扩展4" prop="ex4">
            <el-input v-model="dataItem.ex4" />
          </el-form-item>
          <el-form-item label="扩展5" prop="ex5">
            <el-input v-model="dataItem.ex5" />
          </el-form-item>

          <el-divider content-position="left"></el-divider>

          <el-form-item label="禁用" prop="isDisabled">
            <el-switch v-model="dataItem.isDisabled" />
          </el-form-item>
          <el-divider content-position="left"></el-divider>
          <el-form-item label="归属组织" prop="groupId">
            <group-select v-model="dataItem.groupId"></group-select>
          </el-form-item>
        </el-form>
      </section>
      <div class="drawer-footer">
        <el-button @click.native="drawerVisible = false">
          {{ this.$t("common.cancel") }}
        </el-button>
        <confirm-button
          :validate="formValidate"
          :loading="loading"
          type="submit"
          @click="onSubmit"
        />
      </div>
    </el-drawer>
  </section>
</template>

<script>
// 工具+组件
import ConfirmButton from "@/components/confirm-button";
import GroupSelect from "@/components/group-select";
// import { cloneDeep } from "lodash";

// apis
import { execCreate } from "@/api/dictionary/dictionary-header";

export default {
  name: "dictionary--dictionary-header--add",
  components: {
    ConfirmButton,
    GroupSelect
  },
  props: {
    title: {
      type: String,
      default: "新增"
    },
    visible: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: "rtl"
    },
    size: {
      type: String,
      default: "700px"
    },
    wrapperClosable: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    drawerVisible: {
      get() {
        return this.visible;
      },
      set(v) {
        this.$emit("onChangeDrawer", v);
      }
    }
  },
  data() {
    return {
      loading: false,
      dataItem: {},
      formRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }]
      }
    };
  },
  watch: {
    data(val) {
      this.dataItem = val;
    }
  },
  async mounted() {},

  methods: {
    // 验证表单
    formValidate: function() {
      let isValid = false;
      this.$refs.refForm.validate(valid => {
        isValid = valid;
      });
      return isValid;
    },
    // 关闭表单面板重置表单控件
    onClosePanl() {
      this.$refs.refForm.resetFields();
    },
    async onSubmit() {
      this.loading = true;
      const para = this.dataItem;
      const res = await execCreate(para);
      this.loading = false;

      if (res.success) {
        this.$message({ message: this.$t("common.addOk"), type: "success" });
        this.$refs.refForm.resetFields();
        this.drawerVisible = false;
        // 成功后钩子，共父级调用
        this.$emit("onSuccess", para, res);
      } else {
        this.$message({ message: res.message, type: "error" });
        // 失败后钩子，共父级调用
        this.$emit("onError", para, res);
      }
    }
  }
};
</script>
