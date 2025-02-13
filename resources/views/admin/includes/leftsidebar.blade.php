<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
        <img src="{{ asset('/assets') }}/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="{{ asset('/assets') }}/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <a href="#" class="d-block">Alexander Pierce</a>
            </div>
        </div>

        <!-- SidebarSearch Form -->
        <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
                <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                    <button class="btn btn-sidebar">
                        <i class="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
                with font-awesome or any other icon font library -->
                @if(auth()->user()->is_admin == 1)
                <li class="nav-item">
                    <a href="{{ route('/admin-dashboard')}}" class="nav-link ">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Admin Dashboard</p>
                    </a>
                </li>
                @endif
                <li class="nav-item">
                    <a href="{{ route('/user-dashboard') }}" class="nav-link ">
                        <i class="far fa-circle nav-icon"></i>
                        <p>User Dashboard</p>
                    </a>
                </li>



                <li class="nav-item">
                    <a href="{{ route('/user-dashboard') }}" class="nav-link ">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Shrikant Dashboard</p>
                    </a>
                </li>

                @if(auth()->user()->is_admin == 1)
                <li class="nav-item">
                    <a href="{{ route('/category') }}" class="nav-link ">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Category</p>
                    </a>
                </li>
                @endif
                
                <li class="nav-item">
                    <a href="{{ route('/logout') }}" class="nav-link ">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Logout</p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="{{ route('/logout') }}" class="nav-link ">
                        <i class="far fa-circle nav-icon"></i>
                        <p>shrikant Logout</p>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>