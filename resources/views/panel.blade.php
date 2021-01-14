<div class="thoughtco-cookiepanel @if($openPanel) open @endif">
    @csrf
    <button class="cookiepanel-open" data-cookiepanel="open">{{ $data['button_text'] }}</button>
    <div class="cookiepanel-overlay"></div>
    <div class="cookiepanel-sidebar">
    
        <button type="button" class="cookiepanel-close" data-cookiepanel="close">Close</button>
        
        {!! $data['introduction'] !!}
        
        <div class="buttons">
            <button type="button" data-cookiepanel="accept">Accept all</button>
            <button type="button" data-cookiepanel="reject">Reject all</button>
        </div>
        
        @foreach ($data['cookie_groups'] as $group)
        <p class="heading">{{ $group['title'] }}</p>
        <p>{{ $group['description'] }}</p>
        
            @if ($group['show_toggle'])
        <div class="toggler">
            <input type="checkbox" data-cookiepanel="category" value="analytics" id="thoughtco-cookiepanel-{{ $loop->index }}" />
            <label for="thoughtco-cookiepanel-{{ $loop->index }}">Enabled</label>
            <label for="thoughtco-cookiepanel-{{ $loop->index }}">Disabled</label>
        </div>
            @endif          
        @endforeach    

    </div>
</div>