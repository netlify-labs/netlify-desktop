<template>
  <div class="accounts-list">
    <button type="button" class="dropdown-toggle" @click="toggleDropdown">
      {{ currentAccount.name }}
      <font-awesome-icon
        icon="chevron-down"
        class="dropdown-toggle-icon"
      ></font-awesome-icon>
    </button>
    <ul v-show="showDropdown" class="dropdown">
      <li v-for="account in accounts" :key="account.id">
        <button type="button" @click="setCurrentAccount(account)">
          {{ account.name }}
          <font-awesome-icon
            v-if="account.id === currentAccount.id"
            icon="check"
            class="current-account-icon"
          ></font-awesome-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    ...mapState('accounts', ['accounts', 'currentAccount']),
  },
  methods: {
    ...mapActions('accounts', ['setCurrentAccount']),
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    clickDocument(e) {
      if (!e.target.closest('.dropdown-toggle')) {
        this.closeDropdown();
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.clickDocument);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickDocument);
  },
};
</script>

<style scoped>
* {
  font-size: 16px;
}

.accounts-list {
  position: relative;
}

.dropdown-toggle {
  color: #fff;
}

.dropdown-toggle-icon {
  margin-left: 8px;
}

button {
  border: 0;
  background: transparent;
  font-weight: bold;
  cursor: pointer;
}

button:focus {
  outline: 0;
}

.dropdown {
  position: absolute;
  top: 100%;
  z-index: 999;
  background-clip: padding-box;
  background-color: white;
  border: 1px solid hsl(210, 25%, 97%);
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  color: rgba(14, 30, 37, 0.87);
  left: 0;
  margin-top: 4px;
  min-width: 208px;
}

.dropdown button {
  display: flex;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  white-space: nowrap;
  width: 100%;
  text-align: left;
  align-items: center;
}

.dropdown button:hover {
  background-color: rgba(14, 30, 37, 0.05);
}

.current-account-icon {
  color: rgba(14, 30, 37, 0.38);
  margin-left: auto;
}
</style>
