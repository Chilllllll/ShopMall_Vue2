<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumANDEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>

    <button v-if="startNumANDEndNum.start > 2">···</button>
    <!-- 中间 -->
    <button
      v-for="(page, index) in startNumANDEndNum.end"
      :key="index"
      v-show="page >= startNumANDEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumANDEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumANDEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <!-- <hr />
    <h1>
      start:{{ startNumANDEndNum.start }}---end:{{
        startNumANDEndNum.end
      }}---当前页码:{{ pageNo }}
    </h1> -->
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumANDEndNum() {
      const { pageNo, totalPage, continues } = this;
      let start = 1,
        end = 0;
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);

        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  
    &.active {
      // cursor: not-allowed;
      background-color: rgb(251, 127, 147);
      color: #fff;
    }
  }
}
</style>

