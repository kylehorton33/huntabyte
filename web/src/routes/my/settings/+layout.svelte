<script>
    import {page} from '$app/stores'
    const navigation = [
        {
            title: 'Profile',
            href: '/my/settings/profile'
        },
        {
            title: 'Account',
            href: '/my/settings/account'
        },
        {
            title: 'Security',
            href: '/my/settings/security'
        }
    ]
</script>

<div class="w-full h-full px-2">
    <h3 class="text-2xl font-medium">Settings</h3>
    <div class="divider"></div>
</div>
<div class="flex w-full h-full space-x-4">
    <ul class="menu bg-base-100 w-56 p-2 rounded-box">
        {#each navigation as {title, href}}
            <li>
                <a href={href} class="font-medium {$page.url.pathname === href ? 'active': ''}">{title}</a>
            </li>
        {/each}
    </ul>
    <div class="w-full">
        <slot />
    </div>
</div>