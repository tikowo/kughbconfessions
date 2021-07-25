<template>
  <div class="flex">
    <div
      title="kughbik"
      :class="{ 'w-8': small, 'h-8': small, 'w-11': !small, 'h-11': !small }"
      class="
        flex flex-shrink-0
        mr-2
        justify-center
        items-center
        rounded-full
        bg-gray-300
      "
    >
      <img
        class="transform mr-2"
        :class="{ 'w-5': small, 'h-5': small, 'w-8': !small, 'h-8': !small }"
        style="--tw-scale-y: 1; --tw-scale-x: -1"
        src="../assets/kughbik.png"
        alt=""
      />
    </div>
    <div class="w-full">
      <pre class="break-all whitespace-pre-wrap font-sans">{{
        data[textField]
      }}</pre>
      <time class="text-xs text-gray-500">{{
        $format(new Date(data.created_at), "dd MMM yyyy HH:mm")
      }}</time>
      <template v-if="reply">
        <a
          @click="changeReplying"
          class="text-xs cursor-pointer ml-2 inline-block text-blue-600"
          >Reply</a
        >
        <form v-if="replying" @submit.prevent="handleReply" class="w-full">
          <textarea
            v-model="replyText"
            maxlength="1024"
            class="w-full mt-1 h-8"
          ></textarea>
          <div class="text-right">
            <button
              type="submit"
              class="text-sm mr-2 bg-yellow-900 px-2 text-white"
            >
              Reply
            </button>
            <button @click="changeReplying" type="reset" class="text-sm">
              Cancel
            </button>
          </div>
        </form>
        <div>
          <a
            @click="comments = !comments"
            class="text-xs cursor-pointer text-blue-600"
            >{{ data.replies.length }} Replies</a
          >
        </div>

        <div v-if="comments">
          <message
            v-for="reply in data.replies"
            :key="reply.id"
            :small="true"
            :data="reply"
            textField="reply"
            :reply="false"
            class="mt-2"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    data: {
      type: Object,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
    reply: {
      type: Boolean,
      default: true,
    },
    textField: {
      type: String,
      default: "confession",
    },
  },
  data() {
    return {
      comments: false,
      replying: false,
      replyText: ""
    };
  },
  methods: {
    handleReply() {
      this.$emit("reply", { reply: this.replyText, data: this.data });
      this.replyText = '';
      this.replying = false;
    },
    changeReplying() {
      this.replyText = "";
      this.replying = !this.replying;
    },
  },
};
</script>