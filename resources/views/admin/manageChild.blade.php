<ul>
    @foreach($childs as $child)
    <li>
        {{ $child->category_name }}
        @if(count($child->childs))
            @include('admin.manageChild',['childs' => $child->childs])
        @endif
    </li>
    @endforeach
</ul>