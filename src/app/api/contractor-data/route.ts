import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

// GET contractor data (all or by username)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const supabase = createServerSupabaseClient();

    if (username) {
      // Get specific contractor
      const { data, error } = await supabase
        .from('contractor_data')
        .select('*')
        .eq('username', username)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found

      return NextResponse.json({ success: true, data: data || null });
    }

    // Get all contractors
    const { data, error } = await supabase
      .from('contractor_data')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching contractor data:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST new contractor data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from('contractor_data')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error creating contractor data:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update contractor data
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { username, ...updateData } = body;
    const supabase = createServerSupabaseClient();

    // Upsert - insert if not exists, update if exists
    const { data, error } = await supabase
      .from('contractor_data')
      .upsert({ username, ...updateData }, { onConflict: 'username' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error updating contractor data:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE contractor data
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { success: false, error: 'Username is required' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const { error } = await supabase
      .from('contractor_data')
      .delete()
      .eq('username', username);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting contractor data:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
