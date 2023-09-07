@extends('admin.layouts.admin')
@section('page-content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Category</h1>
        </div><!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Category</li>
          </ol>
        </div><!-- /.col -->
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          @include('admin.includes.flash-message')
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-10">
                  <h3 class="card-title">DataTable with minimal features & hover style</h3>
                </div>
                <div class="col-2"> <a href="{{ route('/add-category') }}" class="btn btn-primary float-right">Add Category</a></div>
              </div>
            </div>

            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Parent Category</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  @if(count($category) > 0)
                  @foreach($category as $row)
                  <tr>
                    <td>{{ ($row->parent_id) ? $row->getParentCategoryName->category_name  : 'N/A' }}</td>
                    <td>{{ $row->category_name }}</td>
                    <td>
                      <div class="dropdown float-none d-inline dropleft">
                        <button class="btn btn-sm d-inline" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fa fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-menu" style="max-height: 150px; overflow-y: auto; ">
                          <a href="{{ route('/edit-category', ['id' => $row->id]) }}" class="dropdown-item view-jd" data-offset="0,10"> <i class="fa fa-edit mr-1"></i> <span class="btnTxt">Edit</span></a>
                          <a href="javascript:void(0)" onclick="deleteCategory({{ $row->id }})" class="dropdown-item view-jd" data-offset="0,10"> <i class="fa fa-trash mr-1"></i> <span class="btnTxt">Delete</span></a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  @endforeach
                  @else
                  <tr>
                    <td colspan="3">No Record Found</td>
                  </tr>
                  @endif
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </section>
  <!-- /.content -->
</div>
<!-- /.content-wrapper -->

<script>
  function deleteCategory(id) {
    if (confirm('Are you sure you want to delete this record.')) {
      var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
      $.ajax({
        type: "post",
        url: "{{ route('/delete-category') }}",
        headers: {
          "X-CSRF-TOKEN": CSRF_TOKEN,
        },
        data: {
          id: id
        },
        dataType: "json",
        success: function(rs) {
          var status = rs.status;
          var message = rs.message;
          if (status == 1) {
            window.location.reload();
          }
        }
      });
    }

  }


  $(function() {
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "responsive": true,
    });
  });
</script>
@endsection