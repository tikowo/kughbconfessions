<template>
  <div class="max-w-lg m-auto bg-gray-100 min-h-screen">
    <header class="relative mb-3 justify-center">
      <figure class="relative" style="padding-bottom: 84%">
        <img :key="mascot" class="w-full h-full absolute" alt="Need jesus" :src="getSrc(mascot)" />
      </figure>
      <a class="absolute right-0 bottom-0 px-3 text-blue-600" @click="changeMascot">Change</a>
    </header>
    <div class="px-2">
      <div class="mb-5">
        <a @click="openConfessionForm" class="text-2xl text-blue-600">Add a confession</a>
        <form @submit.prevent="confess" v-if="confessionForm">
          <textarea maxlength="1024" v-model="confessionText" class="w-full mt-3 mb-1 h-24"></textarea>
          <button class="px-3 py-2 mr-2 bg-yellow-900 text-white" type="submit">Confess</button>
          <button @click="openConfessionForm" class="px-3 py-2 border-2" type="reset">Cancel</button>
        </form>
      </div>

      <p class="text-xl mb-3 text-gray-900">Recent</p>
      <Message :data="confession" v-for="confession in confessions" :key="confession.id"/>
      <button v-if="confessions.length" @click="nextPage" class="px-3 py-2 w-full bg-yellow-900 text-white">load more</button>

      <footer class="py-3 border-t-2">

        <a class="text-blue-600" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Terms of Service</a>
        <p class="mt-1">
          &#169 2021 kughb llc. all rights reserved
        </p>
      </footer>
    </div>
  </div>

</template>

<script>
import { ref } from "@vue/reactivity";
import HelloWorld from "./components/HelloWorld.vue";
import Message from "./components/Message.vue";
import { onMounted } from "@vue/runtime-core";

export default {
  components: { HelloWorld, Message },
  setup() {
    const { VITE_APP_API_URL } = import.meta.env;
    const width = ref(window.innerWidth);
    const mascot = ref(Math.floor(Math.random() * 5) || 1);
    const confessionForm = ref(false);
    const confessionText = ref("");
    const confessions = ref([]);
  
    let currentPage = 0;

    const changeMascot = () => {
      mascot.value += 1;

      if (mascot.value > 5) {
        mascot.value = 1;
      }
    };

    const getSrc = (name) => {
      const path = `./assets/mascots/${name}.png`;
      const modules = import.meta.globEager("./assets/mascots/*.png");
      return modules[path].default;
    };

    const openConfessionForm = () => {
      confessionForm.value = !confessionForm.value;

      confessionText.value = "";
    };

    const confess = async () => {
      // TODO later :3
      document.cookie = "confessed=true;path=/;max-age=3600";

      const response = await fetch(`${VITE_APP_API_URL}/confessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confession: confessionText.value }),
      });

      const confession = await response.json();
      const data = [confession, ...confessions.value];

      confessions.value = data;
      confessionForm.value = false;
      confessionText.value = "";
    };

    onMounted(() => {
      fetchConfessions();
    });

    const nextPage = () => {
      currentPage += 1;
      fetchConfessions();
    };

    const fetchConfessions = async () => {
      const response = await fetch(`${VITE_APP_API_URL}/confessions?page=${currentPage}`);
      const data = await response.json();
      confessions.value = [...confessions.value, ...data];
    }

    return {
      width,
      mascot,
      confessionForm,
      confessionText,
      confessions,
      getSrc,
      changeMascot,
      confess,
      openConfessionForm,
      nextPage
    };
  },
};
</script>

<style>
</style>
