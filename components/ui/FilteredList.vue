<template>
  <div>
    <div class="search-holder">
      <input
        type="text"
        class="search"
        v-model="search"
        :placeholder="placeholder"
      />
    </div>
    <List>
      <ListItem v-for="d in filteredData" :key="d.id">
        <slot name="row" :data="d"></slot>
      </ListItem>
    </List>
  </div>
</template>

<script>
import List from './List.vue';
import ListItem from './ListItem.vue';

export default {
  components: {
    List,
    ListItem,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    filterKeys: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    filteredData() {
      return this.data.filter(d =>
        this.filterKeys.some(k => {
          const prop = d[k];
          return (
            prop && prop.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
          );
        })
      );
    },
  },
};
</script>

<style scoped>
.search-holder {
  position: relative;
}

.search {
  background: none;
  border: 0;
  border-bottom: 2px solid hsl(180, 5%, 92%);
  box-shadow: none;
  color: hsl(198, 45%, 10%);
  display: block;
  font-size: 16px;
  font-weight: 500;
  height: 40px;
  line-height: 24px;
  margin: 0;
  padding: 6px 14px;
  width: 100%;
}

.search:focus {
  outline: 0;
  border-color: hsl(46, 100%, 48%);
}
</style>
