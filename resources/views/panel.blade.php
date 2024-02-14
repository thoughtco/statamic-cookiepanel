<div class="thoughtco-cookiepanel">
    <button class="cookiepanel-open" data-consentpanel="open">{{ $data['button_text'] }}</button>
    <div class="cookiepanel-overlay"></div>
    <div class="cookiepanel-sidebar">

        <button type="button" class="cookiepanel-close" data-consentpanel="close">Close</button>

        {!! $data['introduction'] !!}

        @foreach ($data['cookie_groups'] as $group)
            @if ($group['enabled'])
        <p class="heading">{{ $group['title'] }}</p>
        <p>{{ $group['description'] }}</p>

                @if ($group['show_toggle'])
        <div class="toggler">
            <input type="checkbox" data-consentpanel="category" value="{{ $group['slug'] }}" id="thoughtco-cookiepanel-{{ $loop->index }}" />
            <label for="thoughtco-cookiepanel-{{ $loop->index }}">Enabled</label>
            <label for="thoughtco-cookiepanel-{{ $loop->index }}">Disabled</label>
        </div>
                @endif
            @endif
        @endforeach

        <div class="buttons">
            <button type="button" data-consentpanel="accept">Accept all</button>
            @php $rejectShown = false; @endphp
            @foreach ($data['cookie_groups'] as $group)
                @if (!$rejectShown && $group['enabled'] && $group['show_toggle'])
            <button type="button" data-consentpanel="select">Accept Selected</button>
            <button type="button" data-consentpanel="reject">Reject all</button>
                    @php $rejectShown = true; @endphp
                @endif
            @endforeach
        </div>

    </div>
</div>
