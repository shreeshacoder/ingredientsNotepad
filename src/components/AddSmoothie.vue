<template>
    <div class="add_smoothie container">
        <h2 class="center-align indigo-text">Add new Smoothie</h2>
        <form @submit.prevent="addSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field" v-for="(ing, index) in ingredients" :key=index>
                <label for="ingredient">ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]" @keydown.tab.prevent="checkIng(index)">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Add smoothie</button>
            </div>
        </form>
        
    </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          lower: true,
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.feedback = "You must enter a title";
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Please add a value for the ingredient";
      }
    },
    checkIng(index) {
      if (!this.ingredients[index]) {
        this.feedback = "Please add a value for the ingredient";
      } else {
        this.feedback = null;
      }
    },
    deleteIng(ingredient) {
      this.ingredients = this.ingredients.filter(ing => {
        return ing != ingredient;
      });
    }
  }
};
</script>

<style>
.add_smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add_smoothie .h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add_smoothie .field {
  margin: 20px auto;
  position: relative;
}

.add_smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
