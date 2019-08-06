<template>
  <div>
    <input
      type="text"
      class="search"
      v-model="search"
      :placeholder="placeholder"
    />
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
.search {
  font-size: 1rem;
}
</style>
