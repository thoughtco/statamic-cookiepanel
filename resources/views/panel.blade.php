<div class="thoughtco-cookiepanel @if($openPanel) open @endif">
    @csrf
    <button class="cookiepanel-open" data-cookiepanel="open">{{ $data['button_text'] }}</button>
    <div class="cookiepanel-overlay"></div>
    <div class="cookiepanel-sidebar">
    
        <button type="button" class="cookiepanel-close" data-cookiepanel="close">Close</button>
        
        {!! $data['introduction'] !!}
        
        <div class="buttons">
            <button type="button" data-cookiepanel="accept">Accept all</button>
            @php $rejectShown = false; @endphp
            @foreach ($data['cookie_groups'] as $group)
                @if (!$rejectShown && $group['enabled'] && $group['show_toggle'])
            <button type="button" data-cookiepanel="reject">Reject all</button>
                    @php $rejectShown = true; @endphp
                @endif
            @endforeach
        </div>
        
        @foreach ($data['cookie_groups'] as $group)
            @if ($group['enabled'])
        <p class="heading">{{ $group['title'] }}</p>
        <p>{{ $group['description'] }}</p>
        
                @if ($group['show_toggle'])
        <div class="toggler">
            <input type="checkbox" data-cookiepanel="category" value="{{ $group['slug'] }}" id="thoughtco-cookiepanel-{{ $loop->index }}" @if(in_array($group['slug'], $cookie)) checked @endif />
            <label for="thoughtco-cookiepanel-{{ $loop->index }}">Enabled</label>
            <label for="thoughtco-cookiepanel-{{ $loop->index }}">Disabled</label>
        </div>
                @endif  
            @endif        
        @endforeach    

    </div>
</div>