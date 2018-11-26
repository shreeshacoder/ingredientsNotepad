<template>
    <div class="container edit-smoothie" v-if="smoothie">
        <h2>Edit a smoothie {{smoothie.title }}</h2>
        <form @submit.prevent="editSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div class="field" v-for="(ing, index) in smoothie.ingredients" :key=index>
                <label for="ingredient">ingredient:</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" @keydown.tab.prevent="checkIng(index)">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Update smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        this.smoothie.slug = slugify(this.smoothie.title, {
          lower: true,
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g
        });
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
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
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Please add a value for the ingredient";
      }
    },
    checkIng(index) {
      if (!this.smoothie.ingredients[index]) {
        this.feedback = "Please add a value for the ingredient";
      } else {
        this.feedback = null;
      }
    },
    deleteIng(ingredient) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ing => {
        return ing != ingredient;
      });
    }
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie .h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>