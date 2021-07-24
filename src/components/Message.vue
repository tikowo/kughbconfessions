<template>
  <div class="flex pb-4">
    <div
      title="kughbik"
      class="
        flex flex-shrink-0
        mr-2
        justify-center
        items-center
        w-11
        h-11
        rounded-full
        bg-gray-300
        sticky
        top-2
      "
    >
      <img
        class="w-8 h-8 transform mr-2"
        style="--tw-scale-y: 1; --tw-scale-x: -1"
        src="../assets/kughbik.png"
        alt=""
      />
    </div>
    <div>
      <pre class="break-all whitespace-pre-wrap font-sans">{{
        data.confession
      }}</pre>
      <time class="text-xs text-gray-500">{{
        $format(new Date(data.created_at), "dd MMM yyyy HH:MM")
      }}</time>
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
  },
};
</script>