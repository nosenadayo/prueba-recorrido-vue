<template>
  <button class="button is-primary is-outlined"
          @click="onEditModeChanged"
  >{{ editMode ? 'Terminar Edición' : 'Editar Disponibilidad' }}</button>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {  },
  emits: ['edit-mode-changed'],
  setup(props, { emit }) {
    const editMode = ref(false);

    const onEditModeChanged = () => {
      editMode.value = !editMode.value;
      emit('edit-mode-changed', editMode.value);
    };

    return { editMode, onEditModeChanged };
  }
});
</script>
