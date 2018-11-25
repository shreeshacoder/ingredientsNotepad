<template>
    <div class="add_smoothie container">
        <h2 class="center-align indigo-text">Add new Smoothie</h2>
            <form @submit.prevent="addSmoothie">
                <div class="field title">
                    <label for="title">Smoothie Title:</label>
                    <input type="text" name="title" v-model="title">
                </div>
                <div v-for="(ing, index) in ingredients" :key=index>
                    <label for="ingredient">ingredient:</label>
                    <input type="text" name="ingredient" v-model="ingredients[index]">
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
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null
    };
  },
  methods: {
    addSmoothie() {
      console.log(this.ingredients);
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Please add a value for the ingredient";
      }
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
}
</style>
