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
        <!-- left column -->
        <div class="col-md-12">
        @include('admin.includes.flash-message')
          <!-- general form elements -->
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Add Category</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <form  method="post" action="{{ route('/save-category') }}">
              {{ csrf_field() }}
              <div class="card-body">
                <input type="hidden" class="form-control" id="category_name" name="id"  value="{{ isset($editRecord->id) ? $editRecord->id : ''}}">
                <div class="form-group">
                  <label for="parent_id">Parent Category</label>
                  <select class="form-control select2" style="width: 100%;" name="parent_id" id="parent_id">
                    <option value="0">Select</option>
                    @foreach($categoryList as $key => $row)
                     <option value="{{ $key }}" {{ (isset($editRecord->id) && ($editRecord->parent_id == $key)) ? 'selected' : '' }}> {{ $row }}</option>
                    @endforeach
                  </select>
                </div>

                <div class="form-group">
                  <label for="category_name">Category Name</label>
                  <input type="text" class="form-control" id="category_name" name="category_name" value="{{ isset($editRecord->category_name) ? $editRecord->category_name : ''}}"  placeholder="Category Name">
                </div>

              </div>
              <!-- /.card-body -->

              <div class="card-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
          <!-- /.card -->
        </div>
        <!--/.col (left) -->
      </div>
      <!-- /.row -->
    </div><!-- /.container-fluid -->
  </section>
  <!-- /.content -->
</div>
<!-- /.content-wrapper -->
@endsection