<script>
  import { Input, Modal } from "$lib/components";

  export let form;

  let emailModalOpen;

  $: emailModalOpen = false;
</script>

<div class="flex flex-col w-full h-full space-y-12">
  <div class="w-full">
    <h3 class="text-2xl font-medium">Change Email</h3>
    <div class="divider" />
  </div>
  <Modal label="change-email" checked={emailModalOpen}>
    <span slot="trigger" class="btn btn-primary">Change Email</span>
    <h3 slot="heading">Change Your Email</h3>
    <form action="?/updateEmail" method="POST" class="space-y-2">
        <Input
            id="email"
            type="email"
            required="true"
            value={form?.data?.email}
        />
        <button type="submit" class="btn btn-primary w-full">Change My Email</button>
    </form>
  </Modal>
</div>
