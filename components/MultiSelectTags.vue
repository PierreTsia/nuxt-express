<template>
  <div class="multiselect">

    <v-chip
      v-for="(tag, index) in userTags"
      :key="index"
      :style="{backgroundColor: tag.color? tag.color : chipBackgroundColor}"
      class="tag__chip white--text"
      close
      @input="handleDeleteChip(tag, index)">
      {{ tag._id ? tag.label : tag }}
    </v-chip>
    <v-layout
      row
      align-center
      wrap>
      <v-autocomplete
        v-model="newTags"
        :search-input.sync="inputValue"
        :return-object="true"
        :items="nonPickedTags"
        :label="`Add an existing tag or create a new one`"
        class="multiselect__autocomplete"
        persistent-hint
        item-text="label"/>

      <v-btn
        fab
        dark
        small
        color="warning"
        @click="handleAddNewTag">
        <v-icon>library_add</v-icon>

      </v-btn>

    </v-layout>

    <v-btn @click="$emit('submitNewTags', userTags)">Confirm</v-btn>


  </div>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MultiSelectTags",

  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isEditing: false,
      userTags: [],
      newTags: [],
      newTag: "",
      model: null,
      inputValue: ""
    };
  },
  computed: {
    ...mapGetters(["allTags", "userProfileTags"]),
    chipBackgroundColor() {
      return "#000000".replace(/0/g, () => {
        return (~~(Math.random() * 16)).toString(16);
      });
    },
    nonPickedTags() {
      return this.allTags.filter(
        sourceTag =>
          !this.userProfileTags.some(tag => tag._id === sourceTag._id)
      );
    }
  },
  mounted() {
    if (this.userProfileTags.length) {
      this.userTags = this.userProfileTags;
    }
  },
  methods: {
    handleDeleteChip(tag, index) {
      this.userTags = this.userTags.filter(
        (tag, tagIndex) => tagIndex !== index
      );
    },
    handleAddNewTag() {
      if (this.inputValue && this.inputValue.trim().length > 1) {
        this.nonPickedTags.some(
          existingTag =>
            existingTag.label === this.inputValue.trim().toLowerCase()
              ? this.userTags.push(existingTag)
              : this.userTags.push(this.inputValue.trim().toLowerCase())
        );
      }
    }
  }
};
</script>

<style lang="stylus">
.multiselect
  padding 0 20px
  .multiselect__autocomplete
    max-width 80%
    margin-top 20px



</style>
