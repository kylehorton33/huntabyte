<div class="dropdown dropdown-end mr-4">
    <a href="/projects/new" class="btn btn-primary btn-outline">Add Project</a>
</div>
<div class="dropdown dropdown-end">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
            <img src="https://picsum.photos/80/80" alt="User avatar" />
        </div>
    </label>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
        <li>
            <a href="/my/projects" class="justify-between">My Projects</a>
        </li>
        <li>
            <a href="/my/settings">Settings</a>
        </li>
        <li>
            <form action="/logout" method="POST">
                <button type="submit" class="w-full test-start">
                    Logout
                </button>
            </form>
        </li>
    </ul>
</div>
